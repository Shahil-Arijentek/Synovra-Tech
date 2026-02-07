import os
import re

def px_to_rem(match):
    px_value = int(match.group(1))
    rem_value = px_value / 16
    # Format to avoid trailing zeros
    rem_str = f"{rem_value:.4g}"
    return f"[{rem_str}rem]"

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Regex to find [123px] pattern
    # We look for `[` followed by digits, then `px`, then `]`
    new_content = re.sub(r'\[(\d+)px\]', px_to_rem, content)
    
    if content != new_content:
        print(f"Modifying {filepath}")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

def main():
    root_dir = os.path.join(os.getcwd(), 'src')
    print(f"Scanning {root_dir}...")
    
    for subdir, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.jsx') or file.endswith('.ts') or file.endswith('.js'):
                filepath = os.path.join(subdir, file)
                process_file(filepath)

if __name__ == "__main__":
    main()
