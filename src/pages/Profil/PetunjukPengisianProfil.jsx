import React from "react";
import "../../constants/defaultProgram.css";

// Petunjuk Pengisian component
const PetunjukPengisianProfil = () => {
  return (
    <div>
      <p>
        Menu ini digunakan untuk melihat data wajib pajak yang telah terdaftar
        sebagai pengguna DJP Online
      </p>
      <p>Di menu ini Anda dapat:</p>
      <ol>
        <li>Melihat profil lengkap Anda</li>
        <li>Mengubah data profil (email dan nomor handphone)</li>
        <li>Mengubah password</li>
        <li>Menambah/mengurangi fitur akses layanan di DJP Online</li>
      </ol>
      <p>Untuk melakukan perubahan profil:</p>
      <ul>
        <li>Klik panel Data Profil</li>
        <li>Isikan data baru (no handphone dan/atau email)</li>
        <li>Klik tombol Ubah Profil</li>
      </ul>
      <p>Untuk melakukan perubahan password:</p>
      <ul>
        <li>Klik panel Ubah Password</li>
        <li>
          data password lama, password baru, konfirmasi password baru, kode
          keamanan
        </li>
        <li>Klik tombol Ubah Password</li>
      </ul>
      <p>
        Untuk melakukan penambahan/pengurangan hak akses ke aplikasi-aplikasi
        online lainnya:
      </p>
      <ul>
        <li>Klik panel Tambah/Kurang Hak Akses</li>
        <li>
          Centang pada sisi kiri aplikasi: check untuk menambahkan akses,
          uncheck untuk mengurangi akses
        </li>
        <li>Klik tombol Ubah Akses</li>
      </ul>
    </div>
  );
};

export default PetunjukPengisianProfil;
