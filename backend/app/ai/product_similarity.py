from typing import List, Dict, Any


class ProductSimilarityEngine:
    """
    Computes cross-catalog similarity and reverse-match equivalents.
    Modular design ready for FAISS or pgvector embeddings.
    """

    def find_similar(self, query: str, catalog: List[Dict[str, Any]], limit: int = 3) -> List[Dict[str, Any]]:
        query_words = set(query.lower().split())
        scored_products = []

        for item in catalog:
            item_text = f"{item.get('name', '')} {item.get('brand', '')} {item.get('category', '')} {item.get('description', '')}".lower()
            item_words = set(item_text.split())
            overlap = len(query_words.intersection(item_words))
            score = overlap / max(1, len(query_words))
            scored_products.append((score, item))

        scored_products.sort(key=lambda x: x[0], reverse=True)
        return [p[1] for p in scored_products[:limit]]


product_similarity_engine = ProductSimilarityEngine()
