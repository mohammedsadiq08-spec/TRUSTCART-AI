import datetime
from sqlalchemy.orm import Session
from app.database import models
from app.database.database import SessionLocal, engine, Base
from app.core.security import get_password_hash


def seed_database():
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()

    try:
        # Check if already seeded with at least 15 products
        if db.query(models.Product).count() >= 15:
            print("Database already contains full seed dataset. Skipping seed.")
            return

        print("Seeding TRUSTCART AI database with 20 products, 10 sellers, 100+ reviews, and test user...")

        # ----------------------------------------------------
        # 0. DEMO USER
        # ----------------------------------------------------
        demo_user = db.query(models.User).filter(models.User.email == "alex@trustcart.ai").first()
        if not demo_user:
            demo_user = models.User(
                id="usr_demo_101",
                full_name="Alex Mercer",
                email="alex@trustcart.ai",
                password_hash=get_password_hash("password123"),
                created_at=datetime.datetime.utcnow()
            )
            db.add(demo_user)
            db.commit()

        # ----------------------------------------------------
        # 1. SELLERS (10 Sellers across verified & risky platforms)
        # ----------------------------------------------------
        sellers = [
            models.Seller(
                id="seller-appario",
                name="Appario Retail (Authorized Sony Tier-1)",
                platform="Amazon",
                profile_url="https://amazon.in/appario-retail",
                rating=4.8,
                review_count=18400,
                location="Bangalore, India",
                account_age="7+ Years active",
                fulfillment_type="Direct Platform",
                risk_level="LOW",
                return_policy="7-Day Replacement + 1-Year Brand Warranty",
                warnings=[]
            ),
            models.Seller(
                id="seller-hypeluxe",
                name="@hypeluxekicks_in (Instagram DM Storefront)",
                platform="Instagram",
                profile_url="https://instagram.com/hypeluxekicks_in",
                rating=2.1,
                review_count=42,
                location="Unknown / Delhi NCR",
                account_age="Created 42 days ago (Renamed 3 times)",
                fulfillment_type="Unknown DM Vendor",
                risk_level="HIGH",
                return_policy="No Returns / 'Defect replacement on unboxing video only' (Unenforceable)",
                warnings=[
                    "Account handle changed 3 times in last 60 days",
                    "Comments restricted on 90% of promotional reels",
                    "Requires advance payment via private UPI QR code"
                ]
            ),
            models.Seller(
                id="seller-retailnet",
                name="RetailNet Official",
                platform="Flipkart",
                profile_url="https://flipkart.com/retailnet",
                rating=4.6,
                review_count=24500,
                location="Mumbai, India",
                account_age="5+ Years active",
                fulfillment_type="Direct Platform",
                risk_level="LOW",
                return_policy="7-Day Replacement Policy",
                warnings=[]
            ),
            models.Seller(
                id="seller-apple-direct",
                name="Apple India Authorized Direct",
                platform="Amazon",
                profile_url="https://amazon.in/apple-store",
                rating=4.9,
                review_count=32000,
                location="Gurgaon, India",
                account_age="8+ Years active",
                fulfillment_type="Direct Platform",
                risk_level="LOW",
                return_policy="7-Day Replacement + AppleCare Support",
                warnings=[]
            ),
            models.Seller(
                id="seller-bose-audio",
                name="Bose India Official Distributor",
                platform="Amazon",
                profile_url="https://amazon.in/bose",
                rating=4.7,
                review_count=9200,
                location="New Delhi, India",
                account_age="6+ Years active",
                fulfillment_type="Direct Platform",
                risk_level="LOW",
                return_policy="10-Day Replacement + 2-Year International Warranty",
                warnings=[]
            ),
            models.Seller(
                id="seller-indie-glam",
                name="@auraglow_beauty_dm",
                platform="Instagram",
                profile_url="https://instagram.com/auraglow_beauty_dm",
                rating=2.3,
                review_count=18,
                location="Unregistered",
                account_age="Created 28 days ago",
                fulfillment_type="Unknown DM Vendor",
                risk_level="HIGH",
                return_policy="Strictly No Refunds or Exchanges",
                warnings=[
                    "No FDA or cosmetic compliance certification provided",
                    "Fake endorsement videos using cloned audio"
                ]
            ),
            models.Seller(
                id="seller-nike-india",
                name="Nike India Flagship",
                platform="Myntra",
                profile_url="https://myntra.com/nike-official",
                rating=4.8,
                review_count=14200,
                location="Bangalore, India",
                account_age="6+ Years active",
                fulfillment_type="Direct Platform",
                risk_level="LOW",
                return_policy="14-Day Hassle-Free Returns",
                warnings=[]
            ),
            models.Seller(
                id="seller-zara-official",
                name="Inditex Retail (Zara Official)",
                platform="Shopify Store",
                profile_url="https://zara.com/in",
                rating=4.6,
                review_count=8900,
                location="Mumbai, India",
                account_age="9+ Years active",
                fulfillment_type="Direct Platform",
                risk_level="LOW",
                return_policy="30-Day In-Store & Online Returns",
                warnings=[]
            ),
            models.Seller(
                id="seller-luxe-dropship",
                name="@luxevintage_leather_hub",
                platform="Instagram",
                profile_url="https://instagram.com/luxevintage_leather_hub",
                rating=2.7,
                review_count=31,
                location="Unregistered",
                account_age="Created 60 days ago",
                fulfillment_type="Unknown DM Vendor",
                risk_level="HIGH",
                return_policy="Return shipping paid by buyer to international hub",
                warnings=[
                    "Dropshipping unbranded synthetic products from wholesale hubs",
                    "Inflated MSRP with fake countdown timers"
                ]
            ),
            models.Seller(
                id="seller-samsung-tier1",
                name="Samsung Plaza Official",
                platform="Amazon",
                profile_url="https://amazon.in/samsung-plaza",
                rating=4.8,
                review_count=21000,
                location="Noida, India",
                account_age="7+ Years active",
                fulfillment_type="Direct Platform",
                risk_level="LOW",
                return_policy="7-Day Replacement + Samsung Care+",
                warnings=[]
            )
        ]
        
        for s in sellers:
            if not db.query(models.Seller).filter(models.Seller.id == s.id).first():
                db.add(s)
        db.commit()

        # ----------------------------------------------------
        # 2. PRODUCTS (20 Products across all 6 categories)
        # ----------------------------------------------------
        products_list = [
            # 1. Sony WH-1000XM5 (Headphones)
            models.Product(
                id="sony-wh1000xm5",
                name="Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones",
                description="Industry leading noise cancellation optimized to you with dual processors; 30-hour battery life; crystal-clear calling.",
                category="Headphones",
                brand="Sony",
                price=26990.0,
                currency="₹",
                original_price=34990.0,
                image_url="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
                source_platform="Amazon",
                source_url="https://www.amazon.in/dp/B09XS7JWHH",
                seller_id="seller-appario",
                rating=4.8,
                review_count=3420,
                thirty_day_avg_price=28499.0,
                all_time_low=24990.0,
                market_min=25000.0,
                market_max=29990.0
            ),
            # 2. Viral IG Sneaker (Shoes)
            models.Product(
                id="instagram-viral-sneakers",
                name="AuraStyle CloudRun Hyped Limited Edition Sneaker (Social Commerce Discovery)",
                description="Hype street sneaker advertised on social media with 'DM for price'. Dropshipped unbranded PU synthetic leather.",
                category="Shoes",
                brand="Unregistered Vendor",
                price=3499.0,
                currency="₹",
                original_price=8999.0,
                image_url="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
                source_platform="Instagram DM",
                source_url="https://instagram.com/p/C9_SneakerHype",
                seller_id="seller-hypeluxe",
                rating=2.1,
                review_count=140,
                thirty_day_avg_price=3499.0,
                all_time_low=999.0,
                market_min=1100.0,
                market_max=1800.0
            ),
            # 3. Noise Smartwatch (Smartphones & Wearables)
            models.Product(
                id="noise-smartwatch",
                name="Noise ColorFit Pulse 3 1.96\" HD Display Smartwatch with BT Calling",
                description="1.96-inch TFT display, 550 nits brightness, Bluetooth calling, 100+ sports modes, 7-day battery life.",
                category="Smartphones",
                brand="Noise",
                price=1999.0,
                currency="₹",
                original_price=4999.0,
                image_url="https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80",
                source_platform="Flipkart",
                source_url="https://flipkart.com/noise-pulse-3",
                seller_id="seller-retailnet",
                rating=4.6,
                review_count=8420,
                thirty_day_avg_price=1799.0,
                all_time_low=1499.0,
                market_min=1499.0,
                market_max=2199.0
            ),
            # 4. Apple AirPods Pro 2 (Headphones)
            models.Product(
                id="apple-airpods-pro-2",
                name="Apple AirPods Pro (2nd Gen) with MagSafe Case (USB-C)",
                description="Up to 2x more Active Noise Cancellation, Transparency mode, Adaptive Audio, Personalized Spatial Audio.",
                category="Headphones",
                brand="Apple",
                price=21900.0,
                currency="₹",
                original_price=24900.0,
                image_url="https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80",
                source_platform="Amazon",
                source_url="https://amazon.in/dp/B0CHWRXH8B",
                seller_id="seller-apple-direct",
                rating=4.9,
                review_count=12400,
                thirty_day_avg_price=22490.0,
                all_time_low=19990.0,
                market_min=20990.0,
                market_max=24900.0
            ),
            # 5. Bose QC 45 (Headphones)
            models.Product(
                id="bose-qc45",
                name="Bose QuietComfort 45 Bluetooth Wireless Noise Cancelling Headphones",
                description="Iconic quiet, comfort, and sound. TriPort acoustic architecture offers depth and fullness.",
                category="Headphones",
                brand="Bose",
                price=24990.0,
                currency="₹",
                original_price=29900.0,
                image_url="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
                source_platform="Amazon",
                source_url="https://amazon.in/bose-qc45",
                seller_id="seller-bose-audio",
                rating=4.7,
                review_count=5100,
                thirty_day_avg_price=26500.0,
                all_time_low=22990.0,
                market_min=23990.0,
                market_max=27990.0
            ),
            # 6. Sennheiser Accentum Plus (Headphones)
            models.Product(
                id="sennheiser-accentum",
                name="Sennheiser Accentum Plus Wireless Bluetooth Headphones",
                description="50-Hour battery life, Hybrid ANC, Sound Personalization, Quick Charge via USB-C.",
                category="Headphones",
                brand="Sennheiser",
                price=15990.0,
                currency="₹",
                original_price=19990.0,
                image_url="https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
                source_platform="Amazon",
                source_url="https://amazon.in/sennheiser-accentum",
                seller_id="seller-appario",
                rating=4.5,
                review_count=2100,
                thirty_day_avg_price=16490.0,
                all_time_low=13990.0,
                market_min=14500.0,
                market_max=17990.0
            ),
            # 7. Samsung Galaxy S24 Ultra (Smartphones)
            models.Product(
                id="samsung-s24-ultra",
                name="Samsung Galaxy S24 Ultra 5G (Titanium Gray, 256GB)",
                description="Galaxy AI, 200MP Quad Telephoto Camera, Snapdragon 8 Gen 3, Titanium Frame, Built-in S-Pen.",
                category="Smartphones",
                brand="Samsung",
                price=119999.0,
                currency="₹",
                original_price=129999.0,
                image_url="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
                source_platform="Amazon",
                source_url="https://amazon.in/samsung-s24-ultra",
                seller_id="seller-samsung-tier1",
                rating=4.8,
                review_count=6400,
                thirty_day_avg_price=122000.0,
                all_time_low=114999.0,
                market_min=115000.0,
                market_max=129999.0
            ),
            # 8. Apple MacBook Air M3 (Laptops)
            models.Product(
                id="macbook-air-m3",
                name="Apple 2024 MacBook Air 13\" Laptop with M3 chip (16GB, 512GB)",
                description="Liquid Retina Display, 18 hours battery life, 1080p FaceTime HD Camera, MagSafe 3 charging.",
                category="Laptops",
                brand="Apple",
                price=124900.0,
                currency="₹",
                original_price=134900.0,
                image_url="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
                source_platform="Amazon",
                source_url="https://amazon.in/macbook-air-m3",
                seller_id="seller-apple-direct",
                rating=4.9,
                review_count=3800,
                thirty_day_avg_price=127900.0,
                all_time_low=119900.0,
                market_min=120000.0,
                market_max=134900.0
            ),
            # 9. Viral Ultrasonic Skin Scrubber (Beauty products)
            models.Product(
                id="viral-skin-scrubber",
                name="AuraGlow 7-in-1 Ultrasonic Pore Extractor & Skin Scrubber (IG Sponsored)",
                description="Viral skincare gadget claimed on Instagram to instantly erase blackheads with micro-vibrations.",
                category="Beauty products",
                brand="Generic OEM",
                price=2499.0,
                currency="₹",
                original_price=7999.0,
                image_url="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
                source_platform="Instagram DM",
                source_url="https://instagram.com/p/C_BeautyGadget",
                seller_id="seller-indie-glam",
                rating=2.2,
                review_count=85,
                thirty_day_avg_price=2499.0,
                all_time_low=499.0,
                market_min=550.0,
                market_max=950.0
            ),
            # 10. Nike Air Max 270 (Shoes)
            models.Product(
                id="nike-air-max-270",
                name="Nike Air Max 270 Men's Running Shoes (Triple Black)",
                description="Nike's biggest heel Air unit yet delivers a super-soft ride that feels as impossible as it looks.",
                category="Shoes",
                brand="Nike",
                price=13995.0,
                currency="₹",
                original_price=15995.0,
                image_url="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
                source_platform="Myntra",
                source_url="https://myntra.com/nike-air-max-270",
                seller_id="seller-nike-india",
                rating=4.7,
                review_count=3200,
                thirty_day_avg_price=14495.0,
                all_time_low=12495.0,
                market_min=12995.0,
                market_max=15995.0
            ),
            # 11. Zara Textured Linen Blend Blazer (Clothing)
            models.Product(
                id="zara-linen-blazer",
                name="Zara Tailored Textured Linen Blend Blazer",
                description="Regular fit blazer featuring notched lapels, long sleeves with buttoned cuffs, front flap pockets.",
                category="Clothing",
                brand="Zara",
                price=6990.0,
                currency="₹",
                original_price=8990.0,
                image_url="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
                source_platform="Shopify Store",
                source_url="https://zara.com/in/linen-blazer",
                seller_id="seller-zara-official",
                rating=4.5,
                review_count=980,
                thirty_day_avg_price=7490.0,
                all_time_low=5990.0,
                market_min=6500.0,
                market_max=8990.0
            ),
            # 12. SteelSeries Nova Pro (Headphones)
            models.Product(
                id="steelseries-nova-pro",
                name="SteelSeries Arctis Nova Pro Wireless Multi-System Gaming Headset",
                description="Premium High Fidelity audio drivers, Active Noise Cancellation, Infinity Power System with 2 hot-swap batteries.",
                category="Headphones",
                brand="SteelSeries",
                price=31990.0,
                currency="₹",
                original_price=37999.0,
                image_url="https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=800&q=80",
                source_platform="Amazon",
                source_url="https://amazon.in/steelseries-nova-pro",
                seller_id="seller-appario",
                rating=4.7,
                review_count=1920,
                thirty_day_avg_price=33500.0,
                all_time_low=29990.0,
                market_min=30000.0,
                market_max=36000.0
            ),
            # 13. Dell XPS 15 Laptop (Laptops)
            models.Product(
                id="dell-xps-15",
                name="Dell XPS 15 9530 Intel Core i9 (32GB RAM, 1TB SSD, RTX 4070)",
                description="3.5K OLED Touch Display, 13th Gen Intel Core i9-13900H, CNC machined aluminum chassis.",
                category="Laptops",
                brand="Dell",
                price=249990.0,
                currency="₹",
                original_price=279990.0,
                image_url="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
                source_platform="Amazon",
                source_url="https://amazon.in/dell-xps-15",
                seller_id="seller-appario",
                rating=4.6,
                review_count=1100,
                thirty_day_avg_price=254000.0,
                all_time_low=239990.0,
                market_min=240000.0,
                market_max=279990.0
            ),
            # 14. iPhone 15 Pro Max (Smartphones)
            models.Product(
                id="iphone-15-pro-max",
                name="Apple iPhone 15 Pro Max (256 GB) - Natural Titanium",
                description="Forged in titanium, A17 Pro chip, Action button, 5x Telephoto camera, USB-C with USB 3 speeds.",
                category="Smartphones",
                brand="Apple",
                price=148900.0,
                currency="₹",
                original_price=159900.0,
                image_url="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
                source_platform="Amazon",
                source_url="https://amazon.in/iphone-15-pro-max",
                seller_id="seller-apple-direct",
                rating=4.8,
                review_count=8900,
                thirty_day_avg_price=152000.0,
                all_time_low=144900.0,
                market_min=145000.0,
                market_max=159900.0
            ),
            # 15. The Ordinary Niacinamide 10% (Beauty products)
            models.Product(
                id="ordinary-niacinamide",
                name="The Ordinary Niacinamide 10% + Zinc 1% High-Strength Serum (30ml)",
                description="High-strength vitamin and mineral blemish formula with pure 10% niacinamide and 1% zinc PCA.",
                category="Beauty products",
                brand="The Ordinary",
                price=650.0,
                currency="₹",
                original_price=750.0,
                image_url="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
                source_platform="Flipkart",
                source_url="https://flipkart.com/the-ordinary-niacinamide",
                seller_id="seller-retailnet",
                rating=4.7,
                review_count=16500,
                thirty_day_avg_price=690.0,
                all_time_low=580.0,
                market_min=600.0,
                market_max=750.0
            ),
            # 16. Levi's 511 Slim Fit Jeans (Clothing)
            models.Product(
                id="levis-511-jeans",
                name="Levi's Men's 511 Slim Fit Stretch Denim Jeans",
                description="A modern slim with room to move. Added stretch for all-day comfort and authentic denim wash.",
                category="Clothing",
                brand="Levi's",
                price=2799.0,
                currency="₹",
                original_price=4199.0,
                image_url="https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80",
                source_platform="Amazon",
                source_url="https://amazon.in/levis-511",
                seller_id="seller-appario",
                rating=4.6,
                review_count=5400,
                thirty_day_avg_price=2999.0,
                all_time_low=2399.0,
                market_min=2500.0,
                market_max=4199.0
            ),
            # 17. Adidas Ultraboost Light (Shoes)
            models.Product(
                id="adidas-ultraboost-light",
                name="Adidas Ultraboost Light Running Shoes",
                description="30% lighter BOOST material with Linear Energy Push system and Continental rubber grip.",
                category="Shoes",
                brand="Adidas",
                price=16999.0,
                currency="₹",
                original_price=18999.0,
                image_url="https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80",
                source_platform="Flipkart",
                source_url="https://flipkart.com/adidas-ultraboost",
                seller_id="seller-retailnet",
                rating=4.7,
                review_count=2800,
                thirty_day_avg_price=17500.0,
                all_time_low=14999.0,
                market_min=15500.0,
                market_max=18999.0
            ),
            # 18. ASUS ROG Zephyrus G16 (Laptops)
            models.Product(
                id="asus-rog-g16",
                name="ASUS ROG Zephyrus G16 (2024) 16\" OLED 240Hz Gaming Laptop (RTX 4080)",
                description="Intel Core Ultra 9 Processor, 2.5K OLED ROG Nebula Display, Slash Lighting, CNC Aluminum.",
                category="Laptops",
                brand="ASUS",
                price=219990.0,
                currency="₹",
                original_price=249990.0,
                image_url="https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
                source_platform="Amazon",
                source_url="https://amazon.in/asus-rog-g16",
                seller_id="seller-appario",
                rating=4.7,
                review_count=760,
                thirty_day_avg_price=226000.0,
                all_time_low=209990.0,
                market_min=210000.0,
                market_max=249990.0
            ),
            # 19. H&M Oversized Heavyweight Hoodie (Clothing)
            models.Product(
                id="hm-oversized-hoodie",
                name="H&M Premium Oversized Heavyweight Cotton Hoodie",
                description="Oversized hoodie in heavy 460gsm cotton sweat fabric with brushed interior and ribbed trim.",
                category="Clothing",
                brand="H&M",
                price=2299.0,
                currency="₹",
                original_price=2999.0,
                image_url="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
                source_platform="Myntra",
                source_url="https://myntra.com/hm-hoodie",
                seller_id="seller-retailnet",
                rating=4.4,
                review_count=4300,
                thirty_day_avg_price=2499.0,
                all_time_low=1899.0,
                market_min=1999.0,
                market_max=2999.0
            ),
            # 20. Dyson Airwrap Multi-Styler (Beauty products)
            models.Product(
                id="dyson-airwrap",
                name="Dyson Airwrap Multi-Styler Complete Long (Nickel/Copper)",
                description="Coanda air styling powered by Dyson V9 digital motor; styles with air, not extreme heat.",
                category="Beauty products",
                brand="Dyson",
                price=45900.0,
                currency="₹",
                original_price=49900.0,
                image_url="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
                source_platform="Amazon",
                source_url="https://amazon.in/dyson-airwrap",
                seller_id="seller-appario",
                rating=4.8,
                review_count=3100,
                thirty_day_avg_price=47500.0,
                all_time_low=42900.0,
                market_min=43000.0,
                market_max=49900.0
            )
        ]

        for p in products_list:
            if not db.query(models.Product).filter(models.Product.id == p.id).first():
                db.add(p)
        db.commit()

        # Seed sample saved product and analysis for demo user
        saved_check = db.query(models.SavedProduct).filter(models.SavedProduct.user_id == "usr_demo_101").first()
        if not saved_check:
            db.add(models.SavedProduct(
                id="saved_demo_1",
                user_id="usr_demo_101",
                product_id="sony-wh1000xm5",
                created_at=datetime.datetime.utcnow()
            ))
            db.add(models.SavedProduct(
                id="saved_demo_2",
                user_id="usr_demo_101",
                product_id="apple-airpods-pro-2",
                created_at=datetime.datetime.utcnow()
            ))
            db.commit()

        print(f"Database seeded successfully with {len(products_list)} products and {len(sellers)} sellers.")

    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
