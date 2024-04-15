# Software-House.eu - zadanie rekrutacyjne

Program napisany w Next.js, React, Typescript.
Program to komponent kliencki to wpisywania kodu potwierdzenia tożsamości. 
- każda cyfra to osobny input, 
- wpisnaie cyfry do inputa przenosi cię do kolejnego, 
- usuwanie cyfry z inputa przenosi cię do poprzedniego, 
- strzałki na klawiaturze przenoszą cię pomiędzy inputami, 
- wklejanie kodu jest obsługiwane
- props przymuje listę numer lub string, string to separator inputów, 
numer to ilość inputów do wygenerowania przed wstawieniem separatora, przykładowo [3, '-', 7, '=', 2] 
generuje tam 3 inputy, separator '-', 7 inputów, separator '=', 2 inputy. Wartości te można zmienić w layout.tsx
- stworzono przycisk, który po naciśnięciu wyświetli alert ze stringiem zbudowanym na podstawie 
wygenerowanych inputów i separatorów

- skopiować repozytorium
- "npm ci"
- "npm run dev"
- otworzyć kartę z adresem localhost:3000

