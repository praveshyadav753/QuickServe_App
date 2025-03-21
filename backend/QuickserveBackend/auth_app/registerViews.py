from django.http import JsonResponse
from rest_framework.views import APIView
import json
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from business.models import Business
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.db import IntegrityError, transaction
import logging

logger = logging.getLogger(__name__)

User = get_user_model()

class BusinessRegistrationView(APIView):
    def post(self, request):
        try:
            data = json.loads(request.body)
            
            required_fields = [
                "fullName", "email", "gender", "phoneNumber", "countryCode",
                "password", "confirmPassword", "BusinessName", "address",
                "pincode", "logoUrl"
            ]
            GENDER_MAPPING = {
                "male": "M",
                "female": "F",
                "other": "O",
            }
            
            gender_input = data.get("gender")
            if gender_input not in GENDER_MAPPING:
                return JsonResponse({"error": "Invalid gender value. Allowed: Male, Female, Other"}, status=400)
            data["gender"] = GENDER_MAPPING[gender_input]
            # ✅ Check for missing fields
            missing_fields = [field for field in required_fields if not data.get(field)]
            if missing_fields:
                return JsonResponse({"error": f"Missing fields: {', '.join(missing_fields)}"}, status=400)

            # ✅ Validate password match
            if data["password"] != data["confirmPassword"]:
                return JsonResponse({"error": "Passwords do not match"}, status=400)

            # ✅ Validate email format
            try:
                validate_email(data["email"])
            except ValidationError:
                return JsonResponse({"error": "Invalid email format"}, status=400)

            # ✅ Validate phone number format
            if not data["phoneNumber"].isdigit() or len(data["phoneNumber"]) != 10:
                return JsonResponse({"error": "Invalid phone number"}, status=400)

            # ✅ Validate pincode format
            if not data["pincode"].isdigit() or len(data["pincode"]) != 6:
                return JsonResponse({"error": "Invalid pincode"}, status=400)

            # ✅ Check if email or mobile already exists
            if User.objects.filter(email__iexact=data["email"]).exists():
                return JsonResponse(
                    {
                        "error": "This email is already registered.",
                        "suggestion": "Try logging in or resetting your password.",
                    },
                    status=400
                )
            if User.objects.filter(mobile=f"{data['countryCode']}{data['phoneNumber']}").exists():
                return JsonResponse({"error": "Phone number already in use"}, status=400)

            # ✅ Extract first and last name
            firstname, lastname = data["fullName"].split(" ", 1) if " " in data["fullName"] else (data["fullName"], "")

            # ✅ Use transaction to ensure atomicity
            with transaction.atomic():
                user = User.objects.create(
                    first_name=firstname,
                    last_name=lastname,
                    email=data["email"],  # Ensure email is stored
                    gender=data["gender"],
                    role="Service Provider",
                    mobile=f"{data['countryCode']}{data['phoneNumber']}",
                    password=make_password(data["password"])  # Hashing the password
                )

                business = Business.objects.create(
                    user=user,
                    business_name=data["BusinessName"],
                    address=data["address"],
                    pincode=data["pincode"],
                    logo_url=data["logoUrl"],
                )

            return JsonResponse(
                    {
                        "message": "Business registered successfully",
                        "business_id": business.business_id,
                        "user_id": user.user_id
                    },
                    status=201,
                )
                  
            

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)

        except IntegrityError:
            return JsonResponse({"error": "Database integrity error. Please try again."}, status=500)

        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}", exc_info=True)
            return JsonResponse({"error": f"Unexpected error: {str(e)}"}, status=500)
        
class CustomerRegistrationView(APIView):
    def post(self,request):
        
        try:
            data = json.loads(request.body)
            email=data.get("email")
            password=make_password(data.get("password"))
            try:
                validate_email(data["email"])
            except ValidationError:
                return JsonResponse({"error": "Invalid email format"}, status=400)
            
            if User.objects.filter(email__iexact=data["email"]).exists():
                return JsonResponse(
                    {
                        "error": "This email is already registered.",
                        "suggestion": "Try logging in or resetting your password.",
                    },
                    status=400
                )
            user = User.objects.create(
                 email=email,
                 password=password,
                 role="customer ",
                 )    
            return JsonResponse(
                {
                    "message": "registered successfully",
                    
                    "user_id": user.user_id
                },
                status=201,
            )
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)

        except IntegrityError:
            return JsonResponse({"error": "Database integrity error. Please try again."}, status=500)

        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}", exc_info=True)
            return JsonResponse({"error": f"Unexpected error: {str(e)}"}, status=500)        