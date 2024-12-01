def find_max_chain(numbers):
    first_two_to_numbers = {}

    for num in numbers:
        first_two = num[:2]  
        if first_two not in first_two_to_numbers:
            first_two_to_numbers[first_two] = []
        first_two_to_numbers[first_two].append(num)

    longest_chain = []
    
    def backtrack(current_number, current_chain, used_numbers):
        nonlocal longest_chain

        if len(current_chain) > len(longest_chain):
            longest_chain = current_chain[:]

        last_two_digits = current_number[-2:]
        
        if last_two_digits in first_two_to_numbers:
            for num in first_two_to_numbers[last_two_digits]:
                if num not in used_numbers:  
                    current_chain.append(num[2:6])
                    used_numbers.add(num)
                 
                    backtrack(num, current_chain, used_numbers)
                    
                    used_numbers.remove(num)
                    current_chain.pop()

    for num in numbers:
        backtrack(num, [num], {num})  

    return ''.join(longest_chain)