import pandas as pd
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb+srv://Zareesha:zareesha123@cluster0.kkb4bos.mongodb.net/ecommerceDb')
db = client['ecommerceDb']
products_collection = db['products']

# Fetch products from the database
products = list(products_collection.find({}, {"_id": 1, "price": 1}))

# Create a DataFrame
df = pd.DataFrame(products)

# Debug: Print DataFrame to ensure data is fetched correctly
print("DataFrame Contents:")
print(df)

# Example of a simple recommendation based on price similarity
def get_recommendations(product_id):
    print(f"Getting recommendations for product_id: {product_id}")

    try:
        product = df[df['_id'] == product_id].iloc[0]
        print(f"Selected product: {product}")
    except IndexError:
        print(f"No product found with _id: {product_id}")
        return []  # If the product_id is not found

    df['similarity'] = df['price'].apply(lambda x: abs(x - product['price']))
    recommendations = df.sort_values('similarity').head(5)
    
    # Debug: Print recommendations
    print("Recommendations based on price similarity:")
    print(recommendations)
    
    return recommendations['_id'].tolist()

# Example usage
product_id = 'some_product_id'
recommendations = get_recommendations(product_id)
print("Recommendations:", recommendations)








# import pandas as pd
# from sklearn.metrics.pairwise import cosine_similarity
# from pymongo import MongoClient

# # Connect to MongoDB
# client = MongoClient('mongodb+srv://Zareesha:zareesha123@cluster0.kkb4bos.mongodb.net/ecommerceDb')
# db = client.ecommerceDb
# products_collection = db.products

# # Fetch products from the database
# products = list(products_collection.find({}, {"_id": 1, "price": 1}))

# # Create a DataFrame
# df = pd.DataFrame(products)

# # Example of a simple recommendation based on price similarity
# def get_recommendations(product_id):
#     try:
#         product = df[df['_id'] == product_id].iloc[0]
#     except IndexError:
#         return []  # If the product_id is not found

#     df['similarity'] = df['price'].apply(lambda x: abs(x - product['price']))
#     recommendations = df.sort_values('similarity').head(5)
#     return recommendations['_id'].tolist()

# # Example usage
# product_id = 'some_product_id'
# recommendations = get_recommendations(product_id)
# print(recommendations)





# # # recommend.py
# # import pandas as pd
# # from sklearn.metrics.pairwise import cosine_similarity
# # from pymongo import MongoClient

# # # Connect to MongoDB
# # client = MongoClient('')
# # db = client.ecommerceDb
# # products_collection = db.products

# # # Fetch products from the database
# # products = list(products_collection.find())

# # # Create a DataFrame
# # df = pd.DataFrame(products)

# # # Example of a simple recommendation based on price similarity
# # def get_recommendations(product_id):
# #     product = df[df['_id'] == product_id].iloc[0]
# #     df['similarity'] = df['price'].apply(lambda x: abs(x - product['price']))
# #     recommendations = df.sort_values('similarity').head(5)
# #     return recommendations['_id'].tolist()

# # # Example usage
# # product_id = 'some_product_id'
# # recommendations = get_recommendations(product_id)
# # print(recommendations)
