[English](README.md) | Bahasa Indonesia

# Konverter Braille

Konversi teks ke Braille dan sebaliknya.

## Pendahuluan

Konverter Braille adalah alat berbasis browser satu file untuk mengonversi teks biasa menjadi karakter Braille Unicode atau notasi titik, dan sebaliknya. Alat ini mendukung berbagai bahasa dan aksara, menyediakan antarmuka yang sederhana namun kuat untuk komunikasi dan pembelajaran yang aksesibel.

Antarmuka mendukung Bahasa Inggris dan Bahasa Indonesia.

## Cara Kerja

Konverter ini bekerja dengan memetakan karakter dari berbagai aksara ke pola Braille yang sesuai berdasarkan standar internasional untuk Braille Kelas 1 (tidak disingkat). Mendukung aksara sumber Kiri-ke-Kanan (LTR) maupun Kanan-ke-Kiri (RTL), meskipun Braille sendiri selalu ditampilkan secara LTR.

1.  **Teks ke Braille**: Mengonversi teks biasa menjadi Braille Unicode (misal: ⠓⠑⠇⠇⠕) dan notasi titik (misal: 125 15 123 123 135). Secara otomatis menangani huruf kapital menggunakan tanda kapital ⠠ (titik 6) dan angka menggunakan tanda angka ⠼ (titik 3-4-5-6). Juga mendukung angka Arab Timur (٠-٩) dan Persia (۰-۹), serta tanda nada Vietnam.
2.  **Braille ke Teks**: Mendekode karakter Braille Unicode kembali menjadi teks yang dapat dibaca, mengenali indikator kapital dan angka.
3.  **Nomor Titik ke Braille/Teks**: Memungkinkan pengguna untuk memasukkan kombinasi titik tertentu (misal: "12" untuk ⠃) untuk menghasilkan karakter Braille dan teks yang sesuai.

## Mulai Cepat

1.  Unduh file `BrailleConverter.html` dari repositori ini.
2.  Buka file tersebut di browser web modern apa pun.
3.  Pilih mode konversi dan aksara yang diinginkan.
4.  Masukkan teks atau karakter Braille Anda dan klik "Konversi".

## Fitur Utama

*   **Dukungan Multi-bahasa**: Mendukung lebih dari 70 bahasa dan aksara, termasuk Akan, Amharik, Arab, Azerbaijan, Belarusia, Bengali, Bulgaria, Burma, Katala, Denmark, Dzongkha, Belanda, Inggris, Esperanto, Estonia, Faroe, Filipino, Finlandia, Prancis, Gaelic, Jerman, Yunani, Greenland, Guaraní, Gujarati, Hausa, Hawaii, Ibrani, Hindi, Islandia, Igbo, Indonesia, Inuktitut, Irlandia, Italia, Kannada, Kazakh, Khmer, Korea, Kirgiz, Lao, Latvia, Lituania, Luksemburg, Malayalam, Malta, Māori, Mongolia, Navajo, Norwegia, Odia, Persia, Polandia, Portugis, Punjabi, Rumania, Rusia, Samoa, Sinhala, Slovak, Spanyol, Swedia, Tamil, Tatar, Telugu, Thai, Tibet, Turki, Ukraina, Urdu (India/Pakistan), Vietnam, Welsh, dan Yoruba.
*   **Berbagai Mode**: Teks → Braille, Braille → Teks, dan Nomor Titik → Braille/Teks.
*   **Braille Kelas 1**: Berfokus pada Braille yang tidak disingkat untuk kejelasan dan kepatuhan standar.
*   **Pratinjau Sel Visual**: Representasi visual opsional dari sel Braille dengan penomoran titik.
*   **Salin ke Papan Klip**: Tombol satu klik untuk menyalin hasil (Unicode, Titik, atau Teks).
*   **Desain Responsif**: Bekerja dengan mulus di perangkat desktop dan seluler.
*   **Opsi Tema**: Dukungan untuk tema Terang, Gelap, dan Otomatis (sistem).
*   **Dapat Berjalan Offline**: Satu file HTML tanpa dependensi eksternal; bekerja sepenuhnya secara offline.

## Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT. Lihat file [LICENSE](LICENSE) untuk detailnya.

## Kontribusi

Kontribusi sangat diterima! Jangan ragu untuk melakukan fork pada repositori ini dan mengirimkan pull request. Untuk perubahan besar, silakan buka issue terlebih dahulu untuk mendiskusikan ide Anda.

## Umpan Balik

Jika Anda memiliki umpan balik atau saran, silakan hubungi melalui bagian Issues di repositori ini.
