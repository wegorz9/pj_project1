INSERT INTO rentals (price, rent, title, location, rooms, meterage, description)
VALUES
    (250000.00, 1200.00, 'Cozy Downtown Apartment', 'New York', 2, 800, 'A charming apartment located in the heart of the city with modern amenities.'),
    (500000.00, 2500.00, 'Luxury Condo with Sea View', 'Miami', 3, 1500, 'Enjoy stunning ocean views and top-notch facilities in this luxurious condo.'),
    (180000.00, 900.00, 'Suburban Family Home', 'Austin', 4, 2000, 'Spacious home perfect for families in a quiet suburban neighborhood.'),
    (320000.00, 1600.00, 'Modern Loft in Trendy Area', 'San Francisco', 1, 600, 'A sleek, modern loft located in one of the city''s trendiest neighborhoods.');

INSERT INTO rental_images (rental_id, image)
VALUES
    (1, 'placeholder_image_1'),
    (1, 'placeholder_image_2'),
    (1, 'placeholder_image_3'),

    (2, 'placeholder_image_1'),
    (2, 'placeholder_image_2'),
    (2, 'placeholder_image_3'),

    (3, 'placeholder_image_1'),
    (3, 'placeholder_image_2'),
    (3, 'placeholder_image_3'),

    (4, 'placeholder_image_1'),
    (4, 'placeholder_image_2'),
    (4, 'placeholder_image_3');
