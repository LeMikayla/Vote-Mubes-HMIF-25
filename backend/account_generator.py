import csv
import random
import string

def generate_random_string(length=4):
    # Kombinasi huruf kecil dan angka
    characters = string.ascii_lowercase + string.digits
    return ''.join(random.choice(characters) for _ in range(length))

def generate_mahasiswa_csv(base_npm, filename="daftar_mahasiswa.csv"):
    with open(filename, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(["NPM", "Username", "Password"])
        
        for i in range(1, 151):
            # Menggabungkan base_npm dengan akhiran 3 digit
            suffix = str(i).zfill(3)
            npm = f"{base_npm}{suffix}"
            
            username = generate_random_string(4)
            password = generate_random_string(4)
            
            writer.writerow([npm, username, password])

    print(f"Selesai! File '{filename}' dibuat dengan base NPM: {base_npm}")

# --- Kamu cukup ubah variabel di bawah ini ---
input_base = "2208107010"  # Bisa diganti ke 2508107010, dll.
generate_mahasiswa_csv(input_base)