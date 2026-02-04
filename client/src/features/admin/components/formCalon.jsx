import { useEffect, useState } from "react";
import { adminServices } from "../services/adminServices";
import { toast } from "sonner";

export default function FormCalon({ calon, onBack }) {
  const [form, setForm] = useState({
    name: "",
    npm: "",
    number: "",
    vision: "",
    mission: "",
    foto: null,
  });

  const [Submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (calon) {
      setForm({
        name: calon.name || "",
        npm: calon.npm || "",
        number: calon.number || "",
        vision: calon.vision || "",
        mission: calon.mission || "",
        foto: calon.image_url || null,
      });
    }
  }, [calon]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("File harus berupa gambar!");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Ukuran file maksimal 5MB!");
        return;
      }
      setForm({ ...form, foto: file });
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("npm", form.npm);
      formData.append("number", form.number);
      formData.append("vision", form.vision);
      formData.append("mission", form.mission);

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

      if (error.response) {
        console.log("Data error dari server:", error.response.data);
        console.log("Status:", error.response.status);
        console.log("Headers:", error.response.headers);
      }
      toast.error("Gagal menyimpan data calon.");
    } finally {
      setSubmitting(false);
    }
  };

  const getFotoPreview = () => {
    if (!form.foto) return null;

    if (typeof form.foto === "string") {
      return `${import.meta.env.VITE_STATIC_BASE_URL}${form.foto}`; // ✅ Langsung pakai env
    }
    return URL.createObjectURL(form.foto);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">
        {calon ? "Edit" : "Tambah"} Calon
      </h2>

      <form onSubmit={submit} className="space-y-4">
        <input
          name="name"
          placeholder="name"
          value={form.name}
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

        <input
          name="number"
          placeholder="No."
          value={form.number}
          onChange={handleChange}
          required
          className="w-full p-2.5 border border-slate-300 rounded-md"
        />

        <textarea
          name="vision"
          placeholder="vision"
          value={form.vision}
          onChange={handleChange}
          required
          className="w-full p-2.5 border border-slate-300 rounded-md resize-y min-h-25"
        />

        <textarea
          name="mission"
          placeholder="mission"
          value={form.mission}
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
