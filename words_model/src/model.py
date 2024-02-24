# src/model.py
import torch.nn as nn

class InfiniteModel(nn.Module):
    def __init__(self, vocab_size, embedding_dim, hidden_dim, output_dim):
        super(InfiniteModel, self).__init__()  # Add missing parentheses

        # Embedding layer
        self.embedding = nn.Embedding(vocab_size, embedding_dim)

        # LSTM layer
        self.lstm = nn.LSTM(embedding_dim, hidden_dim, batch_first=True)

        # Fully connected layer
        self.fc = nn.Linear(hidden_dim, output_dim)

    def forward(self, x):
        # x is a tensor of input indices
        embedded = self.embedding(x)
        lstm_output, _ = self.lstm(embedded)

        # Use the output of the last time step
        last_lstm_output = lstm_output[:, -1, :]

        # Fully connected layer
        output = self.fc(last_lstm_output)

        return output
