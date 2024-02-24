# src/train.py
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from joblib import dump

def train_model(dataset_path, max_features=1000, model_save_path='model.joblib'):
    # Step 1: Load the dataset
    dataset = InfiniteDataset(dataset_path, representation='bag-of-words', max_features=max_features)
  
    # Step 2: Extract input sequences and target words from the dataset
    input_sequences = [item['input_sequence'] for item in dataset.data]
    target_words = [item['target_word'] for item in dataset.data]

    # Step 3: Vectorize the input data using CountVectorizer
    # vectorizer = CountVectorizer(max_features=max_features)
    # input_vectorized = vectorizer.fit_transform(input_sequences)

     # Step 3: Vectorize the input data using TfidfVectorizer for better representation
    vectorizer = TfidfVectorizer(max_features=max_features)
    input_vectorized = vectorizer.fit_transform(input_sequences)
    # target_vectorized = vectorizer.transform(target_words).toarray()  # Convert to dense array

    # Step 4: Split the dataset into training and testing sets
    input_train, input_test, target_train, target_test = train_test_split(
        input_vectorized, target_words, test_size=0.2, random_state=42
    )
    
    # Step 5: Initialize the RandomForestClassifier model
    model = RandomForestClassifier(n_estimators=100)

    # Step 6: Train the model with the training data
    model.fit(input_train, target_train)

    # Step 7: Save the trained model and vectorizer for future use
    dump((model, vectorizer), model_save_path)

    # Step 8: Make predictions on the test set
    predictions = model.predict(input_test)

    # Step 9: Evaluate the model accuracy
    accuracy = accuracy_score(target_test, predictions)
    print(f"Accuracy: {accuracy}")

    # Step 10: Print input sequences and predicted outputs
    # for input_sequence, prediction in zip(input_test, predictions):
    #     print(f"Input: {input_sequence}, Predicted Output: {prediction}")
     

    # Test the new data 
    new_data = ["fire water", "wind sail", "sun radiation"]
    # Vectorize the new data
    new_data_vectorized = vectorizer.transform(new_data)

    # Make predictions using the loaded model
    predictions = model.predict(new_data_vectorized)
    print(predictions)
    # Inverse transform predictions to get the original words
    # predicted_words = vectorizer.inverse_transform(predictions)

    # Print the predictions and resulting words
    for input_sequence, prediction in zip(new_data, predictions):
        print(f"Input: {input_sequence}, Predicted Output: {prediction}")



    # Step 11: Inverse transform predictions to get the original words
    # predicted_words = vectorizer.inverse_transform(predictions)

    # Step 12: Print de-vectorized predictions
    # print("De-vectorized Predictions:", predicted_words)

if __name__ == "__main__":
    # Step 13: Run the training method with the specified dataset path
    train_model("/content/drive/MyDrive/infinite_model/data/processed/processed_dataset.txt", max_features=1000)
