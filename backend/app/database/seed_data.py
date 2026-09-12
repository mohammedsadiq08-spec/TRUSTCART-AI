import datetime
from sqlalchemy.orm import Session
from app.database import models
from app.database.database import SessionLocal, engine, Base


def seed_database():
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()

    try:
        # Check if already seeded
        if db.query(models.Product).count() > 0:
            print("Database already contains data. Skipping seed.")
            return

        print("Seeding TRUSTCART AI database with realistic products, sellers, reviews, and price histories...")

        # ----------------------------------------------------
        # 1. SELLERS (6 Sellers)
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
            )
        ]
        db.add_all(sellers)
        db.commit()

        # ----------------------------------------------------
        # 2. PRODUCTS (12 Products across categories)
        # ----------------------------------------------------
        products = [
            # 1. Sony WH-1000XM5 (Headphones)
            models.Product(
                id="sony-wh1000xm5",
                name="Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones",
                description="Industry leading noise cancellation optimized to you; Magnificent Sound, engineered to perfection with the new Integrated Processor V1; Crystal clear hands-free calling with 4 beamforming microphones.",
                category="Audio & Electronics",
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
                category="Footwear & Apparel",
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
            # 3. Noise Smartwatch (Wearables)
            models.Product(
                id="noise-smartwatch",
                name="Noise ColorFit Pulse 3 1.96\" HD Display Smartwatch with BT Calling",
                description="1.96-inch TFT display, 550 nits brightness, Bluetooth calling, 100+ sports modes, 7-day battery life.",
                category="Wearables",
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
            # 4. Apple AirPods Pro 2 (Audio)
            models.Product(
                id="apple-airpods-pro-2",
                name="Apple AirPods Pro (2nd Gen) with MagSafe Case (USB-C)",
                description="Up to 2x more Active Noise Cancellation, Transparency mode, Adaptive Audio, Personalized Spatial Audio with dynamic head tracking.",
                category="Audio & Electronics",
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
            # 5. Bose QC 45 (Audio)
            models.Product(
                id="bose-qc45",
                name="Bose QuietComfort 45 Bluetooth Wireless Noise Cancelling Headphones",
                description="Iconic quiet, comfort, and sound. TriPort acoustic architecture offers depth and fullness.",
                category="Audio & Electronics",
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
            # 6. Sennheiser Accentum Plus (Audio)
            models.Product(
                id="sennheiser-accentum",
                name="Sennheiser Accentum Plus Wireless Bluetooth Headphones",
                description="50-Hour battery life, Hybrid ANC, Sound Personalization, Quick Charge via USB-C.",
                category="Audio & Electronics",
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
                seller_id="seller-appario",
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
            # 9. Viral Ultrasonic Skin Scrubber (Beauty)
            models.Product(
                id="viral-skin-scrubber",
                name="AuraGlow 7-in-1 Ultrasonic Pore Extractor & Skin Scrubber (IG Sponsored)",
                description="Viral skincare gadget claimed on Instagram to instantly erase blackheads with micro-vibrations.",
                category="Beauty & Skincare",
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
            # 10. SteelSeries Nova Pro (Gaming)
            models.Product(
                id="steelseries-nova-pro",
                name="SteelSeries Arctis Nova Pro Wireless Multi-System Gaming Headset",
                description="Premium High Fidelity audio drivers, Active Noise Cancellation, Infinity Power System with 2 hot-swap batteries.",
                category="Audio & Electronics",
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
            # 11. Jabra Elite 8 Active (Fitness)
            models.Product(
                id="jabra-elite-8",
                name="Jabra Elite 8 Active Gen 2 Rugged True Wireless Earbuds",
                description="Military-grade IP68 waterproof, dustproof, and 1m drop-resistant with Spatial Sound.",
                category="Audio & Electronics",
                brand="Jabra",
                price=17999.0,
                currency="₹",
                original_price=21990.0,
                image_url="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
                source_platform="Amazon",
                source_url="https://amazon.in/jabra-elite-8",
                seller_id="seller-appario",
                rating=4.6,
                review_count=1450,
                thirty_day_avg_price=18999.0,
                all_time_low=15999.0,
                market_min=16500.0,
                market_max=20000.0
            ),
            # 12. Sennheiser HD 660S2 (Audiophile)
            models.Product(
                id="sennheiser-hd660s2",
                name="Sennheiser HD 660S2 Audiophile Open-Back Dynamic Headphones",
                description="Reference open dynamic headphones with refined sub-bass precision and handcrafted transducers in Ireland.",
                category="Audio & Electronics",
                brand="Sennheiser",
                price=38990.0,
                currency="₹",
                original_price=49990.0,
                image_url="https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=800&q=80",
                source_platform="Amazon",
                source_url="https://amazon.in/sennheiser-hd660s2",
                seller_id="seller-appario",
                rating=4.9,
                review_count=840,
                thirty_day_avg_price=41000.0,
                all_time_low=36990.0,
                market_min=37500.0,
                market_max=45000.0
            )
        ]
        db.add_all(products)
        db.commit()

        # ----------------------------------------------------
        # 3. REVIEWS (100+ Reviews across products)
        # ----------------------------------------------------
        reviews_data = [
            # Sony Reviews
            models.Review(
                id="rev-sony-1",
                product_id="sony-wh1000xm5",
                seller_id="seller-appario",
                author="Arjun M., Bangalore",
                review_text="Battery lasted around 28 hours with ANC on during long study sessions. Incredibly comfortable, ANC cuts AC hum completely. Microphone is average in windy traffic.",
                rating=4.0,
                verified_purchase=True,
                review_date="3 days ago",
                sentiment_score=85.0,
                credibility_score=92.0,
                suspicion_probability=8.0,
                credibility_label="High Credibility",
                detected_signals=["Specific usage parameters", "Balanced pros/cons", "Verified invoice timestamp"]
            ),
            models.Review(
                id="rev-sony-2",
                product_id="sony-wh1000xm5",
                seller_id="seller-appario",
                author="Priya K., Mumbai",
                review_text="Soundstage is crisp, multipoint Bluetooth connects to my MacBook and iPhone seamlessly. Worth the upgrade from XM4 for office calls.",
                rating=5.0,
                verified_purchase=True,
                review_date="1 week ago",
                sentiment_score=94.0,
                credibility_score=86.0,
                suspicion_probability=14.0,
                credibility_label="High Credibility",
                detected_signals=["Device-specific interoperability mentioned", "Consistent reviewer profile"]
            ),
            models.Review(
                id="rev-sony-3",
                product_id="sony-wh1000xm5",
                seller_id="seller-appario",
                author="User_9823741",
                review_text="BEST HEADPHONES ON EARTH 1000% RECOMMENDED BUY NOW SUPER FAST SHIPPING!!!!!",
                rating=5.0,
                verified_purchase=False,
                review_date="2 weeks ago",
                sentiment_score=98.0,
                credibility_score=16.0,
                suspicion_probability=84.0,
                credibility_label="High Bot Probability",
                detected_signals=["Hyperbolic capitalization", "No technical specifics", "Cluster review burst timestamp"]
            ),

            # Instagram Sneaker Reviews
            models.Review(
                id="rev-scam-1",
                product_id="instagram-viral-sneakers",
                seller_id="seller-hypeluxe",
                author="Bot_Fashion_99",
                review_text="Best quality ever received within 2 days so fast and original!!! 🔥🔥🔥",
                rating=5.0,
                verified_purchase=False,
                review_date="Yesterday",
                sentiment_score=95.0,
                credibility_score=8.0,
                suspicion_probability=92.0,
                credibility_label="High Bot Probability",
                detected_signals=["Account created same day", "Spam comment loop", "Generic template"]
            ),
            models.Review(
                id="rev-scam-2",
                product_id="instagram-viral-sneakers",
                seller_id="seller-hypeluxe",
                author="Rohan_RealBuyer",
                review_text="Paid ₹3500 advance on GPay. No tracking number sent, seller blocked my handle when asked for dispatch status.",
                rating=1.0,
                verified_purchase=False,
                review_date="4 days ago",
                sentiment_score=5.0,
                credibility_score=96.0,
                suspicion_probability=4.0,
                credibility_label="High Credibility",
                detected_signals=["Specific transaction grievance", "High external fraud matching pattern"]
            ),

            # Noise Smartwatch Reviews
            models.Review(
                id="rev-watch-1",
                product_id="noise-smartwatch",
                seller_id="seller-retailnet",
                author="Siddharth T.",
                review_text="Screen is bright outdoors, step counter has ~5% margin compared to Apple Watch. Bluetooth calling is clear indoors.",
                rating=4.0,
                verified_purchase=True,
                review_date="5 days ago",
                sentiment_score=82.0,
                credibility_score=90.0,
                suspicion_probability=10.0,
                credibility_label="High Credibility",
                detected_signals=["Comparative benchmarks provided", "Verified purchase badge"]
            )
        ]

        # Generate additional realistic reviews to reach 100+ reviews
        review_authors = ["Vikram S.", "Sneha R.", "Anand K.", "Pooja D.", "Ramesh B.", "Kavita M.", "Naveen G.", "Divya P.", "Rahul V.", "Meera T."]
        sentiment_phrases = [
            ("Solid battery life and great build quality for daily use.", 4.5, True, 12.0, "High Credibility"),
            ("Noise cancellation is very effective during metro commutes.", 4.8, True, 10.0, "High Credibility"),
            ("Microphone struggled slightly in windy outdoor conditions, but overall very good.", 4.0, True, 14.0, "High Credibility"),
            ("BEST DEAL BUY NOW FAST!!!", 5.0, False, 85.0, "High Bot Probability"),
            ("Delivery was quick, packing was safe. Genuine product with warranty card.", 4.6, True, 15.0, "High Credibility"),
            ("Sound clarity is remarkable, bass is punchy without distorting vocals.", 4.9, True, 8.0, "High Credibility"),
            ("Great product for office work and conference calls.", 4.4, True, 12.0, "High Credibility"),
            ("AMAZING QUALITY PERFECT 10/10 MUST BUY!!!", 5.0, False, 82.0, "High Bot Probability")
        ]

        counter = 10
        for p in products:
            for idx in range(8):
                auth = review_authors[(counter + idx) % len(review_authors)]
                text, r_rating, is_ver, susp, cred_label = sentiment_phrases[idx % len(sentiment_phrases)]
                reviews_data.append(
                    models.Review(
                        id=f"rev-gen-{counter}",
                        product_id=p.id,
                        seller_id=p.seller_id,
                        author=f"{auth} (Verified)",
                        review_text=text,
                        rating=r_rating,
                        verified_purchase=is_ver,
                        review_date=f"{(idx + 1) * 2} days ago",
                        sentiment_score=80.0 if r_rating >= 4.0 else 30.0,
                        credibility_score=100.0 - susp,
                        suspicion_probability=susp,
                        credibility_label=cred_label,
                        detected_signals=["Natural phrasing benchmark", "Verified timestamp"] if is_ver else ["Template phrasing match"]
                    )
                )
                counter += 1

        db.add_all(reviews_data)
        db.commit()

        # ----------------------------------------------------
        # 4. PRICE HISTORY (Timelines for all products)
        # ----------------------------------------------------
        price_history_records = [
            # Sony WH-1000XM5 History
            models.PriceHistory(id="ph-sony-1", product_id="sony-wh1000xm5", price=29990.0, avg_price=29500.0, source="Amazon", recorded_date="1 Aug"),
            models.PriceHistory(id="ph-sony-2", product_id="sony-wh1000xm5", price=29490.0, avg_price=29200.0, source="Amazon", recorded_date="10 Aug"),
            models.PriceHistory(id="ph-sony-3", product_id="sony-wh1000xm5", price=28990.0, avg_price=28900.0, source="Amazon", recorded_date="20 Aug"),
            models.PriceHistory(id="ph-sony-4", product_id="sony-wh1000xm5", price=27990.0, avg_price=28600.0, source="Amazon", recorded_date="1 Sep"),
            models.PriceHistory(id="ph-sony-5", product_id="sony-wh1000xm5", price=26990.0, avg_price=28499.0, source="Amazon", recorded_date="10 Sep"),

            # Noise Smartwatch History
            models.PriceHistory(id="ph-watch-1", product_id="noise-smartwatch", price=1499.0, avg_price=1650.0, source="Flipkart", recorded_date="1 Aug"),
            models.PriceHistory(id="ph-watch-2", product_id="noise-smartwatch", price=1699.0, avg_price=1700.0, source="Flipkart", recorded_date="15 Aug"),
            models.PriceHistory(id="ph-watch-3", product_id="noise-smartwatch", price=1799.0, avg_price=1750.0, source="Flipkart", recorded_date="25 Aug"),
            models.PriceHistory(id="ph-watch-4", product_id="noise-smartwatch", price=1999.0, avg_price=1799.0, source="Flipkart", recorded_date="5 Sep"),

            # Sneaker History
            models.PriceHistory(id="ph-snk-1", product_id="instagram-viral-sneakers", price=4999.0, avg_price=4200.0, source="Instagram", recorded_date="1 Aug"),
            models.PriceHistory(id="ph-snk-2", product_id="instagram-viral-sneakers", price=3999.0, avg_price=3800.0, source="Instagram", recorded_date="15 Aug"),
            models.PriceHistory(id="ph-snk-3", product_id="instagram-viral-sneakers", price=3499.0, avg_price=3499.0, source="Instagram", recorded_date="1 Sep")
        ]
        db.add_all(price_history_records)
        db.commit()

        print(f"Successfully seeded database: {len(products)} products, {len(sellers)} sellers, {len(reviews_data)} reviews, {len(price_history_records)} price history points.")

    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
