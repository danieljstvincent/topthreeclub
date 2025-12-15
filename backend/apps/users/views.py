from rest_framework import status, viewsets
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import login, logout
from django.utils import timezone
from datetime import date, timedelta, datetime
from allauth.socialaccount.models import SocialAccount
from allauth.socialaccount.providers.google.views import oauth2_login
from allauth.socialaccount.providers.facebook.views import oauth2_login as fb_oauth2_login
from .models import User, QuestProgress
from .serializers import UserSerializer, LoginSerializer, QuestProgressSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    """Register a new user"""
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        login(request, user)
        return Response({
            'user': UserSerializer(user).data,
            'message': 'Registration successful'
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """Login user"""
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data['user']
        login(request, user)
        return Response({
            'user': UserSerializer(user).data,
            'message': 'Login successful'
        }, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """Logout user"""
    logout(request)
    return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user_view(request):
    """Get current authenticated user"""
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def social_auth_urls_view(request):
    """Get social authentication URLs"""
    try:
        from django.contrib.sites.models import Site
        
        # Try to get site, but fallback to request if site not configured
        try:
            site = Site.objects.get_current()
            base_url = f"http://{site.domain}" if not site.domain.startswith('http') else site.domain
        except:
            base_url = None
        
        # Use request to build URL (more reliable)
        if request:
            scheme = request.scheme
            host = request.get_host()
            base_url = f"{scheme}://{host}"
        elif not base_url:
            # Fallback
            base_url = 'http://localhost:8000'
        
        return Response({
            'google': f"{base_url}/accounts/google/login/",
            'facebook': f"{base_url}/accounts/facebook/login/",
        })
    except Exception as e:
        # Return URLs even if there's an error
        base_url = request.get_host() if request else 'http://localhost:8000'
        scheme = request.scheme if request else 'http'
        base_url = f"{scheme}://{base_url}" if not base_url.startswith('http') else base_url
        
        return Response({
            'google': f"{base_url}/accounts/google/login/",
            'facebook': f"{base_url}/accounts/facebook/login/",
        })


@api_view(['GET', 'POST', 'PUT'])
@permission_classes([IsAuthenticated])
def quest_progress_view(request):
    """Get or update quest progress for today"""
    today = date.today()
    
    if request.method == 'GET':
        # Get today's progress
        try:
            progress = QuestProgress.objects.get(user=request.user, date=today)
            serializer = QuestProgressSerializer(progress)
            return Response(serializer.data)
        except QuestProgress.DoesNotExist:
            # Return default empty progress
            return Response({
                'date': today.isoformat(),
                'quest_1_text': '',
                'quest_2_text': '',
                'quest_3_text': '',
                'quest_1_completed': False,
                'quest_2_completed': False,
                'quest_3_completed': False,
                'submitted': False,
            })
    
    elif request.method == 'POST' or request.method == 'PUT':
        # Create or update today's progress
        data = request.data.copy()
        data['date'] = today.isoformat()
        
        progress, created = QuestProgress.objects.get_or_create(
            user=request.user,
            date=today,
            defaults={
                'quest_1_text': data.get('quest_1_text', ''),
                'quest_2_text': data.get('quest_2_text', ''),
                'quest_3_text': data.get('quest_3_text', ''),
                'quest_1_completed': data.get('quest_1_completed', False),
                'quest_2_completed': data.get('quest_2_completed', False),
                'quest_3_completed': data.get('quest_3_completed', False),
            }
        )
        
        if not created:
            # Update existing progress (but don't allow resubmission if already submitted)
            if not progress.submitted:
                progress.quest_1_text = data.get('quest_1_text', progress.quest_1_text)
                progress.quest_2_text = data.get('quest_2_text', progress.quest_2_text)
                progress.quest_3_text = data.get('quest_3_text', progress.quest_3_text)
                progress.quest_1_completed = data.get('quest_1_completed', progress.quest_1_completed)
                progress.quest_2_completed = data.get('quest_2_completed', progress.quest_2_completed)
                progress.quest_3_completed = data.get('quest_3_completed', progress.quest_3_completed)
                progress.save()
        
        serializer = QuestProgressSerializer(progress)
        return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_quest_view(request):
    """Submit today's quest progress (one submission per day)"""
    today = date.today()
    
    try:
        progress = QuestProgress.objects.get(user=request.user, date=today)
        
        # Check if already submitted
        if progress.submitted:
            return Response({
                'error': 'You have already submitted today',
                'submitted': True,
                'submitted_at': progress.submitted_at.isoformat() if progress.submitted_at else None
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Mark as submitted
        from django.utils import timezone
        progress.submitted = True
        progress.submitted_at = timezone.now()
        progress.save()
        
        serializer = QuestProgressSerializer(progress)
        return Response({
            'message': 'Successfully submitted!',
            'data': serializer.data
        }, status=status.HTTP_200_OK)
        
    except QuestProgress.DoesNotExist:
        return Response({
            'error': 'No quest progress found for today'
        }, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def quest_history_view(request):
    """Get quest progress history for heatmap"""
    progress_list = QuestProgress.objects.filter(user=request.user).order_by('date')
    serializer = QuestProgressSerializer(progress_list, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def quest_bulk_sync_view(request):
    """Bulk sync quest progress from client"""
    data_list = request.data if isinstance(request.data, list) else [request.data]
    
    synced_count = 0
    for item in data_list:
        try:
            date_str = item.get('date')
            if not date_str:
                continue
                
            progress_date = date.fromisoformat(date_str) if isinstance(date_str, str) else date_str
            
            progress, created = QuestProgress.objects.get_or_create(
                user=request.user,
                date=progress_date,
                defaults={
                    'quest_1_text': item.get('quest_1_text', ''),
                    'quest_2_text': item.get('quest_2_text', ''),
                    'quest_3_text': item.get('quest_3_text', ''),
                    'quest_1_completed': item.get('quest_1_completed', False),
                    'quest_2_completed': item.get('quest_2_completed', False),
                    'quest_3_completed': item.get('quest_3_completed', False),
                }
            )
            
            if not created:
                # Update existing
                progress.quest_1_text = item.get('quest_1_text', progress.quest_1_text)
                progress.quest_2_text = item.get('quest_2_text', progress.quest_2_text)
                progress.quest_3_text = item.get('quest_3_text', progress.quest_3_text)
                progress.quest_1_completed = item.get('quest_1_completed', progress.quest_1_completed)
                progress.quest_2_completed = item.get('quest_2_completed', progress.quest_2_completed)
                progress.quest_3_completed = item.get('quest_3_completed', progress.quest_3_completed)
                progress.save()
            
            synced_count += 1
        except Exception as e:
            continue
    
    return Response({
        'synced_count': synced_count,
        'message': f'Successfully synced {synced_count} days'
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def quest_stats_view(request):
    """Get user statistics (streak, total XP, momentum hours)"""
    progress_list = list(QuestProgress.objects.filter(user=request.user).order_by('-date'))
    
    total_xp = 0
    streak = 0
    today = timezone.localdate()
    
    # Create a map for quick lookup
    progress_map = {progress.date: progress for progress in progress_list}
    
    for progress in progress_list:
        completed_count = sum([
            progress.quest_1_completed,
            progress.quest_2_completed,
            progress.quest_3_completed
        ])
        total_xp += completed_count
    
    # Calculate streak (consecutive days with all 3 quests completed)
    for i in range(365):  # Check up to a year
        check_date = date.fromordinal(today.toordinal() - i)
        progress = progress_map.get(check_date)
        
        if progress:
            if (progress.quest_1_completed and 
                progress.quest_2_completed and 
                progress.quest_3_completed):
                streak += 1
            else:
                break
        else:
            # If no progress for this day, streak is broken
            break
    
    # Calculate hours of consistency based on current streak
    momentum_hours = 0
    if streak > 0:
        # Start counting from the beginning of the streak (midnight of first day)
        streak_start_date = today - timedelta(days=streak - 1)
        start_datetime = datetime.combine(streak_start_date, datetime.min.time())
        
        # Ensure timezone awareness matches the current time
        if timezone.is_naive(start_datetime):
            start_datetime = timezone.make_aware(start_datetime, timezone.get_default_timezone())
        
        now = timezone.now()
        momentum_hours = int((now - start_datetime).total_seconds() // 3600)
    
    return Response({
        'streak': streak,
        'total_xp': total_xp,
        'momentum_hours': momentum_hours,
    })

