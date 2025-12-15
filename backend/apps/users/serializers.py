from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from .models import User, QuestProgress


class UserSerializer(serializers.ModelSerializer):
    """User serializer for registration"""
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True, label='Confirm Password')

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'password2', 'first_name', 'last_name', 'date_joined')
        extra_kwargs = {
            'password': {'write_only': True},
            'date_joined': {'read_only': True},
        }

    def validate(self, attrs):
        # Validate password match for registration
        if attrs.get('password') != attrs.get('password2'):
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        # Remove password2 before creating user
        validated_data.pop('password2', None)
        user = User.objects.create_user(**validated_data)
        return user

    def to_representation(self, instance):
        """Exclude password fields when reading user data"""
        data = super().to_representation(instance)
        # Remove password fields from output (they're write_only, but be explicit)
        data.pop('password', None)
        data.pop('password2', None)
        return data


class LoginSerializer(serializers.Serializer):
    """Serializer for login"""
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            user = authenticate(username=username, password=password)
            if not user:
                raise serializers.ValidationError('Invalid credentials')
            if not user.is_active:
                raise serializers.ValidationError('User account is disabled')
            attrs['user'] = user
        else:
            raise serializers.ValidationError('Must include username and password')
        return attrs


class QuestProgressSerializer(serializers.ModelSerializer):
    """Serializer for quest progress"""
    class Meta:
        model = QuestProgress
        fields = ('id', 'date', 'quest_1_text', 'quest_2_text', 'quest_3_text',
                  'quest_1_completed', 'quest_2_completed', 'quest_3_completed',
                  'submitted', 'submitted_at', 'choices_locked', 'choices_locked_at',
                  'created_at', 'updated_at')
        read_only_fields = ('id', 'submitted_at', 'choices_locked_at', 'created_at', 'updated_at')

