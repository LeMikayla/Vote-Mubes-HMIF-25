import { useEffect, useState } from "react";
import { adminServices } from "../services/adminServices";

export default function FormCalon({ calon, onBack }) {
  const [form, setForm] = useState({
    nama: "",
    npm: "",
    visi: "",
    misi: "",
    foto: null,
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (calon) {
      setForm({
        nama: calon.nama || "",
        npm: calon.npm || "",
        visi: calon.visi || "",
        misi: calon.misi || "",
        foto: calon.foto || null,
      });
    }
  }, [calon]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, foto: file });
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("nama", form.nama);
      formData.append("npm", form.npm);
      formData.append("visi", form.visi);
      formData.append("misi", form.misi);

      if (form.foto && typeof form.foto === "object") {
        formData.append("foto", form.foto);
      }

      if (calon) {
        await adminServices.updateCandidate(calon.id, formData);
      } else {
        await adminServices.createCandidate(formData);
      }
      onBack();
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      // tambahkan toast
    } finally {
      setSubmitting(false);
    }
  };

  const getFotoPreview = () => {
    if (!form.foto) return null;

    return typeof form.foto === "string"
      ? form.foto
      : URL.createObjectURL(form.foto);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">
        {calon ? "Edit" : "Tambah"} Calon
      </h2>

      <form onSubmit={submit} className="space-y-4">
        <input
          name="nama"
          placeholder="Nama"
          value={form.nama}
          onChange={handleChange}
          required
          className="w-full p-2.5 border border-slate-300 rounded-md"
        />

        <input
          name="npm"
          placeholder="NPM"
          value={form.npm}
          onChange={handleChange}
          required
          className="w-full p-2.5 border border-slate-300 rounded-md"
        />

        <textarea
          name="visi"
          placeholder="Visi"
          value={form.visi}
          onChange={handleChange}
          required
          className="w-full p-2.5 border border-slate-300 rounded-md resize-y min-h-25"
        />

        <textarea
          name="misi"
          placeholder="Misi"
          value={form.misi}
          onChange={handleChange}
          required
          className="w-full p-2.5 border border-slate-300 rounded-md resize-y min-h-25"
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Foto Kandidat
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFoto}
            className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
          />
        </div>

        {form.foto && (
          <div className="mt-2">
            <img
              src={getFotoPreview()}
              alt="Preview"
              className="w-22.5 h-22.5 rounded-full object-cover border-2 border-gray-200"
            />
          </div>
        )}

        <div className="mt-4 space-x-2">
          <button
            type="submit"
            disabled={Submitting}
            className={`px-4 py-2 rounded-md font-medium text-white transition
              ${Submitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {Submitting ? "Menyimpan..." : "Simpan"}
          </button>

          <button
            type="button"
            onClick={onBack}
            disabled={Submitting}
            className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
