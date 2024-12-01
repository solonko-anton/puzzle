# Puzzle
![Puzzle](https://github.com/solonko-anton/puzzle/blob/main/image.png)
## Установка та запуск

1. Перевірте чи вільні порти 3000 та 8000
   
   `sudo ss -lntu | grep -E ':3000|:8000' `

   якщо ні, то звільніть.

2. Перевірте чи встановлений docker-compose `docker-compose --version`, якщо ні то встановіть `sudo apt install docker-compose`

3. Встановити веб-додаток `git clone https://github.com/solonko-anton/puzzle.git` 

4. Для запуску потрібно перейти в директорію puzzle/
   `cd puzzle/` та виконати команду `docker-compose up --build`


## Алгоритм

### Місце знаходження алгоритму

Алгортим знаходиться в файлі `algorithm.py`

```
—— puzzle/
        | — client/
        |        |
        |       ...
        | — server/
        |        |
        |         — alghoritm/
        |        |       |
        |        ...      — algorithm.py
```


### Принцип роботи

#### 1. Формуємо словарь з чисел, ключ яких дорівнює їхнім першим двом цифрам.
    
Приклад:  Є числа `numbers = ["3456", "1299", "1276" "1245", "9876", "6578", "3421"]` 

Словарь буде сформований так:
```python
        first_two_to_numbers = {
            "34": ["3456", "3421"],
            "12": ["1299", "1276", "1245"],
            "98": ["9876"],
            "65": ["6578"]
        }

 ```

Оголушуємо найдовший ланцюжок `longest_chain = []` який на початку буде пустим

#### 2. Далі рекурсивно знаходимо найдовше число
   
2.1. Беремо перше число з всього масиву, який передний користувачем

```python
    for num in numbers:
        backtrack(num, [num], {num})  
```

2.2. Функція `backtrack`:

 Приймає на вхід 3 аргументи:

1. Перше число з списку
2. Поточний ланцюжок (Відразу з першим числом)
3. Використані числа (Відразу з першим числом) 

    Порівняюємо на довжину поточний ланцюжок з найдовшим (який оголосили на початку), якщо поточний більший, то змінюємо найдовший

    ```python
    if len(current_chain) > len(longest_chain):
        longest_chain = current_chain[:]
    ```
    
    Далі беремо дві останні цифри нашого числа

    ```python
     last_two_digits = current_number[-2:]
    ```

    Якщо є цифри які розпочинаються з цих двох чисел то йдемо далі
    та  вибираємо числа із нашого словника сформованого на початку, та щоб вони не були використані
    ```python
     if last_two_digits in first_two_to_numbers:
        for num in first_two_to_numbers[last_two_digits]:
                if num not in used_numbers:
    ```

    Записуємо це число в `current_chain` та додаємо в `used_numbers` 
    ```python
                    current_chain.append(num[2:6])
                    used_numbers.add(num)
    ```

    Та знову викликаємо `backtrack(num, current_chain, used_numbers)`

    Якщо вже не має чисел які можна було б додати, наша функція повертається на рівень вверх, видаляючи останнє число із поточного списку, та списку використаних

    ```python
                    used_numbers.remove(num)
                    current_chain.pop()
    ```
    Та перебирає інші варіанти

    І так поки 

    1.  ` if last_two_digits in first_two_to_numbers`
    Не буде виконуватись 

    2. Всі числа будуть використані, та всі варіанти перебрані
   
   В кінці ми повертаємо результат в вигляді строки
   ```python
    return ''.join(longest_chain)
   ``` 