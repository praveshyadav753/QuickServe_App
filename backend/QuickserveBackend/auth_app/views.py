from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from rest_framework import status

User = get_user_model()

@api_view(['POST'])
def login_view(request):
    data = request.data
    email = data.get('email')
    password = data.get('password')

    # Check if email and password are provided
    if not email or not password:
        return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error":"not registered"})

    # Check if user exists and password is correct
    print(user.password)
    print(user.check_password(password))
    if user is None or not user.check_password(password):
        return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)

    # Check if the user is active
    if not user.is_active:
        return Response({'error': 'Your account is inactive. Contact support.'}, status=status.HTTP_403_FORBIDDEN)

    # Generate JWT tokens
    refresh = RefreshToken.for_user(user)
    return Response({
        'access_token': str(refresh.access_token),
        'refresh_token': str(refresh),
        'user': {
            'id': user.user_id,
            'username': user.username,
            'email': user.email
        }
    }, status=status.HTTP_200_OK)
