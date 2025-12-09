# Supabase Integration Guide - 3 Top Three Club

This guide explains how Supabase is integrated into the 3 Top Three Club application.

## Overview

Your Supabase project is configured and ready to use:
- **Project URL**: `https://pcgnwpzkdntdhninzklw.supabase.co`
- **Anon Key**: Configured in environment variables

## Quick Start

### 1. Environment Setup

The Supabase configuration is already set up in:
- **Frontend**: `/frontend/.env.local`
- **Configuration File**: `/frontend/src/lib/supabase.ts`

### 2. Using Supabase in Your App

Import the Supabase client in your components:

```typescript
import { supabase, supabaseHelpers } from '@/lib/supabase';
```

## Available Features

### Authentication

#### Sign Up with Email/Password
```typescript
const { data, error } = await supabaseHelpers.signUp(
  'user@example.com',
  'password123',
  { username: 'johndoe' } // optional metadata
);
```

#### Sign In with Email/Password
```typescript
const { data, error } = await supabaseHelpers.signIn(
  'user@example.com',
  'password123'
);
```

#### Sign Out
```typescript
const { error } = await supabaseHelpers.signOut();
```

#### Get Current User
```typescript
const { user, error } = await supabaseHelpers.getCurrentUser();
```

#### OAuth (Google/Facebook)
```typescript
// Sign in with Google
const { data, error } = await supabaseHelpers.signInWithOAuth('google');

// Sign in with Facebook
const { data, error } = await supabaseHelpers.signInWithOAuth('facebook');
```

### Database Operations

#### Insert Data
```typescript
const { data, error } = await supabase
  .from('quest_progress')
  .insert({
    user_id: userId,
    quest_1_text: 'My first quest',
    quest_1_completed: false,
  });
```

#### Read Data
```typescript
const { data, error } = await supabase
  .from('quest_progress')
  .select('*')
  .eq('user_id', userId)
  .single();
```

#### Update Data
```typescript
const { data, error } = await supabase
  .from('quest_progress')
  .update({ quest_1_completed: true })
  .eq('id', questId);
```

#### Delete Data
```typescript
const { data, error } = await supabase
  .from('quest_progress')
  .delete()
  .eq('id', questId);
```

### Realtime Subscriptions

Listen to database changes in realtime:

```typescript
const channel = supabase
  .channel('quest_changes')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'quest_progress',
      filter: `user_id=eq.${userId}`,
    },
    (payload) => {
      console.log('Change received!', payload);
    }
  )
  .subscribe();

// Cleanup
channel.unsubscribe();
```

## Database Schema Setup

### Recommended Tables

#### users (Built-in Auth)
Supabase automatically creates this table. You can extend it with:
```sql
-- Add custom fields to auth.users metadata
-- Or create a profiles table:

CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  username TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
```

#### quest_progress
```sql
CREATE TABLE quest_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  date DATE NOT NULL,
  quest_1_text TEXT,
  quest_2_text TEXT,
  quest_3_text TEXT,
  quest_1_completed BOOLEAN DEFAULT FALSE,
  quest_2_completed BOOLEAN DEFAULT FALSE,
  quest_3_completed BOOLEAN DEFAULT FALSE,
  submitted BOOLEAN DEFAULT FALSE,
  submitted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE quest_progress ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own quests"
  ON quest_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quests"
  ON quest_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own quests"
  ON quest_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX quest_progress_user_id_idx ON quest_progress(user_id);
CREATE INDEX quest_progress_date_idx ON quest_progress(date);
```

#### user_stats
```sql
CREATE TABLE user_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users UNIQUE NOT NULL,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  total_xp INTEGER DEFAULT 0,
  total_quests_completed INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own stats"
  ON user_stats FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own stats"
  ON user_stats FOR UPDATE
  USING (auth.uid() = user_id);
```

## Authentication Setup in Supabase Dashboard

### 1. Enable Email Authentication
1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Configure email templates (optional)

### 2. Enable OAuth Providers (Google/Facebook)

#### Google OAuth
1. Go to **Authentication** → **Providers** → **Google**
2. Enable Google provider
3. Add your Google OAuth credentials:
   - **Client ID**: From Google Cloud Console
   - **Client Secret**: From Google Cloud Console
4. Add authorized redirect URL:
   - `https://pcgnwpzkdntdhninzklw.supabase.co/auth/v1/callback`

#### Facebook OAuth
1. Go to **Authentication** → **Providers** → **Facebook**
2. Enable Facebook provider
3. Add your Facebook App credentials:
   - **App ID**: From Facebook Developers
   - **App Secret**: From Facebook Developers
4. Add authorized redirect URL:
   - `https://pcgnwpzkdntdhninzklw.supabase.co/auth/v1/callback`

### 3. Configure Site URL
In **Authentication** → **URL Configuration**:
- **Site URL**: `http://localhost:3000` (development) or your production URL
- **Redirect URLs**: Add allowed callback URLs

## Migrating from Django Backend

If you want to use Supabase instead of your Django backend:

### Option 1: Hybrid Approach (Recommended)
- Use Supabase for authentication
- Keep Django for complex business logic and API endpoints
- Use Supabase database for quest data

### Option 2: Full Supabase
- Move all data to Supabase
- Use Supabase Edge Functions for server-side logic
- Remove Django backend dependency

## Environment Variables

### Development (.env.local)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://pcgnwpzkdntdhninzklw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjZ253cHprZG50ZGhuaW56a2x3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyMzYyNjgsImV4cCI6MjA4MDgxMjI2OH0.BeAW8Fwb7snSI9xq7LuTvO74BAGqGVws0QObc1XeZIU
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Production (Vercel/Hosting Platform)
Add the same environment variables to your deployment platform.

## Security Best Practices

1. **Never expose the service_role key** - Only use it server-side
2. **Always use Row Level Security (RLS)** - Protect your data
3. **Validate user input** - Even with RLS, validate data
4. **Use environment variables** - Never hardcode keys
5. **Enable email confirmation** - For production authentication

## Testing Supabase Integration

### Quick Test
```typescript
// In any component
import { supabase } from '@/lib/supabase';

// Test connection
const testConnection = async () => {
  const { data, error } = await supabase.from('quest_progress').select('count');
  if (error) {
    console.error('Supabase connection error:', error);
  } else {
    console.log('Supabase connected successfully!');
  }
};
```

## Troubleshooting

### Common Issues

**Error: "Invalid API key"**
- Check that your `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
- Verify the key hasn't expired

**Error: "Row Level Security policy violation"**
- Ensure RLS policies are created
- Check that the user is authenticated
- Verify the policy allows the operation

**OAuth redirect issues**
- Check that redirect URLs are added to Supabase
- Verify Site URL is configured correctly
- Ensure OAuth provider is enabled

## Additional Resources

- **Supabase Dashboard**: https://supabase.com/dashboard/project/pcgnwpzkdntdhninzklw
- **Supabase Docs**: https://supabase.com/docs
- **Auth Helpers**: https://supabase.com/docs/guides/auth
- **Database Guide**: https://supabase.com/docs/guides/database

---

**Created**: December 2024
**Project**: 3 Top Three Club
**Version**: 1.0
