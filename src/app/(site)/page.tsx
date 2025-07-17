"use client";

import { motion } from "framer-motion";
import React from "react"; // Added for React state
import Image from "next/image";

export default function Home() {
  const cards = [
    {
      title: "360 гектаров",
      description: "Собственный питомник площадью 360 га — один из крупнейших в СНГ.",
      icon: "/area.png",
      alt: "Площадь 360 га"
    },
    {
      title: "Десятки тысяч взрослых деревьев",
      description: "Коллекция отобранных растений, готовых к пересадке и ландшафтным проектам любого масштаба.",
      icon: "/pine-tree.png",
      alt: "Десятки тысяч деревьев"
    },
    {
      title: "Доставка, посадка и гарантия 3 года",
      description: "Работаем по всему СНГ: бережно доставим, посадим и обеспечим приживаемость под договор.",
      icon: "/protected.png",
      alt: "Гарантия"
    },
  ];

  return (
    <>
      {/* Add your main content here */}
      <section className="w-full flex justify-center mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl w-full px-4">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              className="bg-white rounded-2xl border border-zinc-100 p-8 flex flex-col items-center text-center"
              style={{ boxShadow: '0 12px 48px 0 rgba(46, 111, 64, 0.32)' }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: idx * 0.2 }}
            >
              <div className="w-16 h-16 mb-5 flex items-center justify-center rounded-full bg-[#F3F7F4]">
                <Image src={card.icon} alt={card.alt} width={40} height={40} className="w-10 h-10 object-contain" />
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold mb-3" style={{ color: '#2E6F40' }}>{card.title}</h3>
              <p className="text-zinc-600 text-base">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Callback Request Form */}
      <section className="w-full flex justify-center mt-16 mb-20">
        <div className="flex flex-col md:flex-row items-center justify-center gap-0 w-full max-w-6xl min-h-[400px]">
          <div className="flex flex-col justify-center items-center w-full md:w-3/5 h-full mb-8 md:mb-0">
            <Image src="/small-field.png" alt="Field" width={700} height={500} className="w-full h-auto max-w-[400px] md:max-w-[700px] object-cover" />
          </div>
          <div className="w-full md:w-2/5 flex flex-col justify-center items-center px-4 md:px-20 md:ml-10 md:min-w-[500px]">
            <CallbackForm />
          </div>
        </div>
      </section>
    </>
  );
}

// Add the CallbackForm component at the bottom of the file
function CallbackForm() {
  const [phone, setPhone] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  function validatePhone(value: string) {
    // Accepts +7 (XXX) XXX-XX-XX or +7XXXXXXXXXX
    return /^\+7\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/.test(value.replace(/\s+/g, ''));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (!validatePhone(phone)) {
      setError("Введите корректный номер телефона в формате +7");
      return;
    }
    if (!name.trim()) {
      setError("Введите имя");
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setPhone("");
      setName("");
    }, 1200);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl flex flex-col items-center bg-transparent p-0"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-2 text-center">Остались вопросы?</h2>
      <p className="text-zinc-600 mb-8 text-center text-base md:text-lg">Закажите обратный звонок что бы проконсультироваться с нашими специалистами</p>
      <div className="w-full flex flex-col gap-5 mb-4">
        <input
          type="tel"
          placeholder="Телефон (+7 XXX XXX-XX-XX)"
          className="w-full px-4 py-3 rounded-lg border border-zinc-200 focus:ring-2 focus:ring-[#2E6F40] focus:outline-none text-zinc-900 text-base transition"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
          pattern="^\+7\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$"
        />
        <input
          type="text"
          placeholder="Имя"
          className="w-full px-4 py-3 rounded-lg border border-zinc-200 focus:ring-2 focus:ring-[#2E6F40] focus:outline-none text-zinc-900 text-base transition"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      {error && <div className="text-red-600 text-sm mb-3 w-full text-center">{error}</div>}
      {success && <div className="text-green-600 text-sm mb-3 w-full text-center">Спасибо! Мы скоро свяжемся с вами.</div>}
      <button
        type="submit"
        className="w-full py-3 rounded-lg text-white font-semibold text-base mt-2 transition disabled:opacity-60 shadow-lg"
        style={{ backgroundColor: '#2E6F40' }}
        disabled={loading}
      >
        {loading ? "Отправка..." : "Заказать звонок"}
      </button>
    </form>
  );
}
