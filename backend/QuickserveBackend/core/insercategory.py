from core.models import Category, Subcategory

# Define subcategories for each category
subcategories_data = {
    "Beauty & Personal Care": [
        {"subcategory_name": "Hair Care", "image_url": "https://example.com/hair-care.jpg"},
        {"subcategory_name": "Skin Care", "image_url": "https://example.com/skin-care.jpg"},
        {"subcategory_name": "Nail Care", "image_url": "https://example.com/nail-care.jpg"},
        {"subcategory_name": "Makeup", "image_url": "https://example.com/makeup.jpg"},
        {"subcategory_name": "Spa Services", "image_url": "https://example.com/spa.jpg"},
    ],
    "Health & Wellness": [
        {"subcategory_name": "Yoga", "image_url": "https://example.com/yoga.jpg"},
        {"subcategory_name": "Meditation", "image_url": "https://example.com/meditation.jpg"},
        {"subcategory_name": "Nutrition", "image_url": "https://example.com/nutrition.jpg"},
        {"subcategory_name": "Alternative Therapies", "image_url": "https://example.com/therapies.jpg"},
        {"subcategory_name": "Fitness Coaching", "image_url": "https://example.com/fitness.jpg"},
    ],
    "Technology and IT Services": [
        {"subcategory_name": "Software Development", "image_url": "https://example.com/software.jpg"},
        {"subcategory_name": "IT Support", "image_url": "https://example.com/it-support.jpg"},
        {"subcategory_name": "Hardware Services", "image_url": "https://example.com/hardware.jpg"},
        {"subcategory_name": "Cloud Services", "image_url": "https://example.com/cloud.jpg"},
        {"subcategory_name": "Digital Marketing", "image_url": "https://example.com/marketing.jpg"},
    ],
    "Fitness & Gym": [
        {"subcategory_name": "Gym Memberships", "image_url": "https://example.com/gym.jpg"},
        {"subcategory_name": "Personal Training", "image_url": "https://example.com/personal-training.jpg"},
        {"subcategory_name": "Group Classes", "image_url": "https://example.com/group-classes.jpg"},
        {"subcategory_name": "Specialized Training", "image_url": "https://example.com/specialized-training.jpg"},
        {"subcategory_name": "Wellness Services", "image_url": "https://example.com/wellness.jpg"},
    ],
    # Add more categories and subcategories as needed
}

# Insert subcategories for each category
for category_name, subcategories in subcategories_data.items():
    try:
        category = Category.objects.get(category_name=category_name)
        for subcategory_data in subcategories:
            Subcategory.objects.create(
                category=category,
                subcategory_name=subcategory_data["subcategory_name"],
                image_url=subcategory_data["image_url"]
            )
        print(f"Subcategories added for {category_name}")
    except Category.DoesNotExist:
        print(f"Category '{category_name}' does not exist in the database.")

print("Subcategories inserted successfully!")