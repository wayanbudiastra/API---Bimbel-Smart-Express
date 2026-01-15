
import React from 'react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <header className="mb-12 border-b border-gray-700 pb-6">
        <h1 className="text-4xl font-bold text-blue-400 mb-2">BimbelSmart API</h1>
        <p className="text-gray-400">Arsitektur Backend Professional dengan Node.js, Express, & Prisma</p>
      </header>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-green-400">Struktur Folder Project</h2>
        <pre className="bg-black p-6 rounded-lg overflow-x-auto text-sm border border-gray-700">
{`bimbel-smart-api/
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── redis.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── course.controller.js
│   │   └── quiz.controller.js
│   ├── docs/
│   │   └── swagger.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── role.middleware.js
│   │   └── upload.middleware.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── course.routes.js
│   │   └── quiz.routes.js
│   ├── services/
│   │   └── auth.service.js
│   ├── utils/
│   │   └── jwt.js
│   └── app.js
├── .env
├── server.js
└── package.json`}
        </pre>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-purple-400">Instruksi Jalankan</h2>
        <div className="space-y-4">
          <div className="bg-gray-800 p-4 rounded-md border-l-4 border-purple-500">
            <p className="font-mono text-sm">1. npm install</p>
            <p className="text-xs text-gray-500 mt-1">Menginstall semua dependensi yang diperlukan.</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-md border-l-4 border-purple-500">
            <p className="font-mono text-sm">2. npx prisma migrate dev</p>
            <p className="text-xs text-gray-500 mt-1">Generate database MySQL sesuai schema.</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-md border-l-4 border-purple-500">
            <p className="font-mono text-sm">3. npx prisma db seed</p>
            <p className="text-xs text-gray-500 mt-1">Mengisi data awal (Admin, Guru, Siswa).</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-md border-l-4 border-purple-500">
            <p className="font-mono text-sm">4. npm run dev</p>
            <p className="text-xs text-gray-500 mt-1">Menjalankan server dalam mode development.</p>
          </div>
        </div>
      </section>

      <footer className="text-center text-gray-500 text-sm mt-20 italic">
        Seluruh kode backend diimplementasikan dalam file-file terpisah di bawah ini.
      </footer>
    </div>
  );
};

export default App;
