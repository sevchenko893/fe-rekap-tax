  <template>
  <v-container>
    <h2>Daftar Kehadiran</h2>

    <!-- Tombol Kembali -->
    <v-btn color="secondary" @click="goBack">Kembali</v-btn>

    <!-- Filter -->
    <v-row class="my-4">
      <v-col cols="12" md="4">
        <v-text-field v-model="searchNIK" label="Cari NIK" clearable></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-select 
          v-model="selectedLocation" 
          label="Pilih Lokasi"
          :items="locations" 
          clearable>
        </v-select>
      </v-col>
    </v-row>

    <!-- Tabel Kehadiran -->
    <v-table>
      <thead>
        <tr>
          <th>NIK</th>
          <th>Nama</th>
          <th>Lokasi</th>
          <th>Total Kehadiran</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredAttendance" :key="index">
          <td>{{ item.nik }}</td>
          <td>{{ item.nama }}</td>
          <td>{{ item.lokasi }}</td>
          <td>{{ getTotalHadir(item.kehadiran) }} Hari</td>
          <td>
            <v-btn color="primary" @click="showDetail(item.id)">
              Show
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import attendanceData from "../attendance_january_2025.js";

const router = useRouter();
const searchNIK = ref("");
const selectedLocation = ref(null);
const locations = ["cisauk", "vbi", "sumarecon bekasi"];

// Fungsi navigasi ke halaman show berdasarkan ID
const showDetail = (id) => {
  router.push(`/attendance/${id}`);
};

// Fungsi kembali ke halaman utama absensi
const goBack = () => {
  router.push("/attendance");
};

// Hitung total kehadiran
const getTotalHadir = (kehadiran) => {
  return kehadiran.filter(k => k.status === "Hadir").length;
};

// Filter data berdasarkan NIK dan lokasi
const filteredAttendance = computed(() => {
  return attendanceData.filter(item => {
    const matchNIK = searchNIK.value ? item.nik.includes(searchNIK.value) : true;
    const matchLocation = selectedLocation.value ? item.lokasi === selectedLocation.value : true;
    return matchNIK && matchLocation;
  });
});
</script>
