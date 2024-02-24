# src/dataset.py
import os

def preprocess_data(input_file, output_file):
    with open(input_file, 'r') as file:
        data = [line.strip() for line in file]

    # Remove duplicates
    unique_data = list(set(data))

    # Additional preprocessing steps if needed
    processed_data = unique_data  # Placeholder, replace with your actual preprocessing logic

    with open(output_file, 'w') as file:
        file.write('\n'.join(processed_data))

if __name__ == "__main__":
    input_path = os.path.join("words_model","data", "raw", "dataset.txt")
    output_path = os.path.join("words_model","data", "processed", "processed_dataset.txt")
    preprocess_data(input_path, output_path)
