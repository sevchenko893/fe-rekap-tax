  <template>
  <v-container>
    <h2>Daftar Kehadiran</h2>

    <!-- Tombol Kembali -->
    <v-btn color="secondary" @click="goBack">Kembali</v-btn>
    <BaseDialog
    v-model="isDialogOpen"
    title="Detail Kehadiran"
    buttonText="Tambah Absensi"
    buttonColor="danger"
    buttonVariant="tonal"
    @closed="isDialogOpen = false"
    >
    <p><strong>NIK:</strong> {{ selectedDetail?.nik }}</p>
    <p><strong>Nama:</strong> {{ selectedDetail?.nama }}</p>
    <p><strong>Lokasi:</strong> {{ selectedDetail?.lokasi }}</p>
    <p><strong>Total Kehadiran:</strong> {{ selectedDetail ? getTotalHadir(selectedDetail.kehadiran) : 0 }} Hari</p>
    </BaseDialog>

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
            <v-btn color="primary" @click="update(item.id)">
              Update
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup>
import BaseDialog from "../../src/components/BaseDialog.vue";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import attendanceData from "../attendance_january_2025.js";

const selectedDetail = ref(null);
// Fungsi menampilkan detail menggunakan dialog
const isDialogOpen = ref(false);

const router = useRouter();
const searchNIK = ref("");
const selectedLocation = ref(null);
const locations = ["cisauk", "vbi", "sumarecon bekasi"];

const addAttendance = (item) => {
  selectedDetail.value = item;
  isDialogOpen.value = true;
};

// Fungsi navigasi ke halaman show berdasarkan ID
const showDetail = (id) => {
  router.push(`/attendance/${id}`);
};

const update = (id) => {
  router.push(`/attendance/update?id=${id}`);

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
