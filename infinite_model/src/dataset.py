# src/dataset.py
import torch
from torch.utils.data import Dataset
from torchtext.data.utils import get_tokenizer
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer

class InfiniteDataset(Dataset):
    def __init__(self, file_path, representation='bag-of-words', max_features=1000):
        self.data = []
        self.tokenizer = get_tokenizer('basic_english')

        with open(file_path, 'r') as file:
            for line in file:
                words = line.strip().split()
                if len(words) != 3:
                    continue

                input_sequence = ' '.join(words[:2])
                target_word = words[2]

                self.data.append({'input_sequence': input_sequence, 'target_word': target_word})

        # Represent input sequences using bag-of-words or TF-IDF
        if representation == 'bag-of-words':
            vectorizer = CountVectorizer(max_features=max_features)
        elif representation == 'tf-idf':
            vectorizer = TfidfVectorizer(max_features=max_features)
        else:
            raise ValueError("Invalid representation type. Use 'bag-of-words' or 'tf-idf'.")

        self.features = vectorizer.fit_transform([item['input_sequence'] for item in self.data])

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        return {'features': torch.tensor(self.features[idx].todense()), 'target_word': self.data[idx]['target_word']}
