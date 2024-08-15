// Ambil elemen-elemen dari HTML
const form = document.getElementById('bmi-form');
const bmiResult = document.getElementById('bmi-result');
const downloadButton = document.getElementById('download-button');
const diseaseInfo = document.querySelector('.disease-info');
const healthWarning = document.querySelector('.health-warning');
const diseaseList = document.getElementById('disease-list');

// Fungsi untuk menghitung BMI dan menampilkan hasilnya
function calculateBMI(event) {
    event.preventDefault(); // Mencegah form untuk melakukan submit secara default
    
    // Ambil nilai dari input
    const gender = form.elements['gender'].value;
    const age = parseFloat(form.elements['age'].value);
    const weight = parseFloat(form.elements['weight'].value);
    const height = parseFloat(form.elements['height'].value) / 100; // Konversi tinggi badan dari cm ke meter
    
    // Perhitungan BMI
    const bmi = weight / (height * height);

    // Menentukan kategori BMI dan penjelasan
    let category = '';
    let description = '';
    let diseases = [];
    if (bmi < 18.5) {
        category = 'Kekurangan berat badan';
        description = `BMI kamu berada pada rentang kurang dari 18.5. Anda berada di bawah berat badan normal, mungkin perlu menambah asupan nutrisi dan berkonsultasi dengan ahli gizi.`;
        diseases = [
            'Anemia: Kurangnya sel darah merah yang sehat.',
            'Gangguan Tiroid: Bisa mempengaruhi metabolisme dan berat badan.',
            'Kekurangan Gizi: Bisa menyebabkan masalah kesehatan umum.'
        ];
    } else if (bmi >= 18.5 && bmi < 25.0) {
        category = 'Normal';
        description = `BMI kamu berada pada rentang 18.5 - 24.9. Berat badan Anda berada dalam rentang yang sehat. Pertahankan pola makan dan gaya hidup sehat.`;
        diseases = [
            'Penyakit Jantung Koroner: Risiko rendah jika gaya hidup sehat.',
            'Diabetes Tipe 2: Risiko rendah dengan berat badan ideal.',
            'Tekanan Darah Tinggi: Risiko rendah dengan berat badan normal.'
        ];
    } else if (bmi >= 25.0 && bmi < 30.0) {
        category = 'Kelebihan berat badan';
        description = `BMI kamu berada pada rentang 25.0 - 29.9. Anda memiliki berat badan lebih dari batas normal. Pertimbangkan untuk meningkatkan aktivitas fisik dan memperbaiki pola makan.`;
        diseases = [
            'Diabetes Tipe 2: Risiko meningkat dengan kelebihan berat badan.',
            'Penyakit Jantung: Risiko meningkat karena kelebihan berat badan.',
            'Kolesterol Tinggi: Sering terkait dengan berat badan berlebih.'
        ];
    } else {
        category = 'Kegemukan (Obesitas)';
        description = `BMI kamu berada pada rentang 30.0 atau lebih. Berat badan Anda melebihi batas sehat. Dianjurkan untuk berkonsultasi dengan dokter atau ahli gizi untuk mendapatkan saran lebih lanjut.`;
        diseases = [
            'Diabetes Tipe 2: Risiko tinggi pada obesitas.',
            'Penyakit Jantung: Risiko signifikan karena kelebihan berat badan.',
            'Obstructive Sleep Apnea: Gangguan pernapasan saat tidur.'
        ];
    }

    // Tampilkan hasil BMI, kategori, dan penjelasan dalam kotak biru
    bmiResult.innerHTML = `
        <p class="bmi-value">BMI Anda adalah ${bmi.toFixed(2)}</p>
        <p class="bmi-category">Kamu ${category.toLowerCase()}.</p>
        <p class="bmi-description">${description}</p>
    `;

    // Tampilkan tombol download dan keterangan kesehatan
    downloadButton.style.display = 'block';
    healthWarning.style.display = 'block';
    diseaseList.innerHTML = diseases.map(disease => `<li>${disease}</li>`).join('');
    diseaseInfo.style.display = 'block';

    // Simpan hasil BMI ke dalam teks
    downloadButton.addEventListener('click', function() {
        const resultText = `Hasil BMI\n\nBMI Anda adalah ${bmi.toFixed(2)}\nKategori: ${category}\n\n${description}\n\nPenyakit atau Keterangan Terkait:\n\n${diseases.join('\n')}`;
        const blob = new Blob([resultText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'hasil_bmi.txt';
        a.click();
        URL.revokeObjectURL(url);
    });
}

// Tambahkan event listener untuk formulir
form.addEventListener('submit', calculateBMI);

// Tambahkan event listener untuk tombol reset
document.getElementById('reset-button').addEventListener('click', function() {
    bmiResult.innerHTML = 'Silakan masukkan data dan klik tombol "Hitung BMI" untuk melihat hasilnya.';
    downloadButton.style.display = 'none'; // Sembunyikan tombol download saat reset
    diseaseInfo.style.display = 'none'; // Sembunyikan informasi penyakit saat reset
    healthWarning.style.display = 'none'; // Sembunyikan keterangan kesehatan saat reset
});
