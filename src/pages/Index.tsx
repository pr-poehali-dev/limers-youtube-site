import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/16f8dd31-d766-423d-ac58-aad69f30c037/files/8f621edd-830c-4274-8425-fcfa44368d12.jpg";
const MC_IMAGE = "https://cdn.poehali.dev/projects/16f8dd31-d766-423d-ac58-aad69f30c037/files/1c3b6a29-a8dc-48a1-adf0-44f86b80b833.jpg";

const NAV_LINKS = [
  { label: "Главная", href: "#home" },
  { label: "О канале", href: "#about" },
  { label: "Розыгрыши", href: "#giveaway" },
  { label: "Сервер", href: "#server" },
];

const SCHEDULE = [
  { day: "ПН", time: "20:00", game: "Minecraft — ивент", type: "mc", active: false },
  { day: "СР", time: "19:00", game: "Разные игры", type: "game", active: false },
  { day: "ПТ", time: "20:00", game: "Minecraft — PvP турнир", type: "mc", active: false },
  { day: "СБ", time: "18:00", game: "Розыгрыш + стрим", type: "event", active: true },
  { day: "ВС", time: "17:00", game: "Совместный стрим", type: "game", active: false },
];

const GAMES = [
  { name: "Minecraft", emoji: "⛏️", streams: "Скоро будет стрим" },
  { name: "CS2", emoji: "🎯", streams: "Скоро будет стрим" },
  { name: "Fortnite", emoji: "🔫", streams: "Скоро будет стрим" },
];

const SERVER_FEATURES = [
  { icon: "Sword", label: "PvP арены", desc: "Ежедневные турниры" },
  { icon: "Map", label: "Выживание", desc: "Общий мир" },
  { icon: "Gift", label: "Розыгрыши", desc: "Призы каждую неделю" },
  { icon: "Users", label: "Сообщество", desc: "Дружный чат" },
  { icon: "Trophy", label: "Рейтинг", desc: "Топ игроков" },

];

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const giveawayDate = new Date("2026-04-05T20:00:00");
  const countdown = useCountdown(giveawayDate);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "streams", "giveaway", "server"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[var(--dark-bg)] text-white font-rubik overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(10,13,20,0.92)] backdrop-blur-md border-b border-[var(--card-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <span className="font-orbitron font-black text-xl neon-text-cyan animate-flicker tracking-widest">
            LIMERS
          </span>
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`text-sm font-medium tracking-wide transition-all duration-200 hover:text-[var(--neon-cyan)] ${
                  activeSection === link.href.replace("#", "")
                    ? "text-[var(--neon-cyan)]"
                    : "text-gray-400"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <a
            href="https://www.youtube.com/@Limers_Studio"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-2 neon-btn-cyan px-4 py-2 rounded font-orbitron text-xs tracking-wider"
          >
            <Icon name="Youtube" size={14} />
            ПОДПИСАТЬСЯ
          </a>
          <button className="md:hidden text-gray-300" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[var(--card-bg)] border-t border-[var(--card-border)] px-4 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-left text-gray-300 hover:text-[var(--neon-cyan)] py-1"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center grid-bg pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 scanlines"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,245,255,0.03)] via-transparent to-[var(--dark-bg)]" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[var(--neon-purple)] opacity-5 blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-[var(--neon-cyan)] opacity-5 blur-3xl animate-float delay-500" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-orbitron font-black text-5xl sm:text-7xl md:text-8xl leading-none mb-4 opacity-0 animate-slide-up" style={{ animationFillMode: "forwards" }}>
            <span className="neon-text-cyan">LIM</span>
            <span className="text-white">ERS</span>
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl mb-3 opacity-0 animate-slide-up delay-200" style={{ animationFillMode: "forwards" }}>
            Геймерский YouTube канал • Трансляции • Розыгрыши
          </p>
          <p className="text-gray-500 text-sm mb-10 opacity-0 animate-slide-up delay-300" style={{ animationFillMode: "forwards" }}>
            Minecraft сервер · PvP турниры · Совместные стримы
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-slide-up delay-400" style={{ animationFillMode: "forwards" }}>
            <a
              href="https://www.youtube.com/@Limers_Studio"
              target="_blank"
              rel="noreferrer"
              className="neon-btn-cyan px-8 py-3 rounded font-orbitron text-sm tracking-wider flex items-center justify-center gap-2"
            >
              <Icon name="Youtube" size={16} />
              НА КАНАЛ
            </a>

          </div>
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-sm mx-auto opacity-0 animate-slide-up delay-500" style={{ animationFillMode: "forwards" }}>
            {[
              { value: "2", label: "подписчиков" },
              { value: "0", label: "стримов" },
              { value: "0", label: "игроков" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-orbitron font-black text-2xl neon-text-cyan">{stat.value}</div>
                <div className="text-gray-500 text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={24} className="text-[var(--neon-cyan)] opacity-60" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-[var(--neon-cyan)] font-orbitron text-xs tracking-widest mb-3">// О КАНАЛЕ</div>
            <h2 className="font-orbitron font-black text-3xl sm:text-4xl mb-6 leading-tight">
              КТО ТАКОЙ<br />
              <span className="neon-text-cyan">LIMERS?</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Привет! Я Limers — геймер, который обожает делиться кайфом от игр. На канале ты найдёшь стримы разных игр, 
              эпичные моменты, и конечно наш любимый Minecraft с кучей событий и розыгрышей.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Наш сервер Minecraft — это живое сообщество, где каждую неделю проходят турниры, 
              ивенты и розыгрыши крутых призов. Заходи — будет весело!
            </p>
            <div className="flex flex-wrap gap-3">
              {["Minecraft", "CS2", "Fortnite"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 border border-[var(--card-border)] rounded text-sm text-gray-400 hover:border-[var(--neon-cyan)] hover:text-[var(--neon-cyan)] transition-all cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {GAMES.map((game) => (
              <div key={game.name} className="game-card rounded-lg p-4 flex items-center gap-3">
                <span className="text-2xl">{game.emoji}</span>
                <div>
                  <div className="font-medium text-sm text-white">{game.name}</div>
                  <div className="text-xs text-gray-500">{game.streams}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="py-4 border-y border-[var(--card-border)] overflow-hidden bg-[var(--card-bg)]">
        <div className="flex animate-scroll-x whitespace-nowrap gap-12" style={{ width: "max-content" }}>
          {[...Array(2)].map((_, i) =>
            ["⛏️ MINECRAFT СЕРВЕР", "🎯 СТРИМЫ КАЖДУЮ НЕДЕЛЮ", "🏆 PVP ТУРНИРЫ", "🎁 РОЗЫГРЫШИ ПРИЗОВ", "⚡ МИНИ-ИГРЫ", "🔴 LIVE КАЖДУЮ НЕДЕЛЮ"].map((item, j) => (
              <span key={`${i}-${j}`} className="text-xs font-orbitron tracking-widest text-gray-500 px-6">
                {item}
              </span>
            ))
          )}
        </div>
      </div>

      {/* GIVEAWAY */}
      <section id="giveaway" className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[var(--neon-purple)] opacity-5 blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="text-[var(--neon-purple)] font-orbitron text-xs tracking-widest mb-3">// РОЗЫГРЫШИ</div>
          <h2 className="font-orbitron font-black text-3xl sm:text-4xl mb-6">
            СЛЕДУЮЩИЙ <span className="neon-text-purple">РОЗЫГРЫШ</span>
          </h2>
          <div className="inline-block mb-8 px-4 py-2 border border-[var(--neon-purple)] rounded text-[var(--neon-purple)] text-sm font-medium">
            🎁 Ранг на сервере LIMERS
          </div>
          <div className="flex justify-center gap-4 mb-10">
            {[
              { value: countdown.days, label: "ДНЕЙ" },
              { value: countdown.hours, label: "ЧАСОВ" },
              { value: countdown.minutes, label: "МИНУТ" },
              { value: countdown.seconds, label: "СЕКУНД" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center">
                <div className="game-card neon-border-purple rounded-lg w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center">
                  <span className="font-orbitron font-black text-2xl sm:text-3xl neon-text-purple">
                    {String(value).padStart(2, "0")}
                  </span>
                </div>
                <span className="text-gray-600 text-xs font-orbitron mt-2 tracking-widest">{label}</span>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto text-left">
            {[
              { icon: "Youtube", step: "1", text: "Подпишись на YouTube канал" },
              { icon: "Heart", step: "2", text: "Поставь лайк последнему видео" },
              { icon: "MessageCircle", step: "3", text: "Напиши «LIMERS» в комментарии" },
            ].map(({ icon, step, text }) => (
              <div key={step} className="game-card rounded-lg p-4 border border-[var(--card-border)]">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-orbitron font-black text-[var(--neon-purple)] text-lg">{step}</span>
                  <Icon name={icon} size={18} className="text-gray-500" />
                </div>
                <p className="text-sm text-gray-400">{text}</p>
              </div>
            ))}
          </div>
          <button className="neon-btn-purple px-10 py-3 rounded font-orbitron text-sm tracking-wider">
            🎁 УЧАСТВОВАТЬ В РОЗЫГРЫШЕ
          </button>
        </div>
      </section>

      {/* SERVER */}
      <section id="server" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-[var(--neon-cyan)] font-orbitron text-xs tracking-widest mb-3">// MINECRAFT СЕРВЕР</div>
          <h2 className="font-orbitron font-black text-3xl sm:text-4xl mb-4">
            СЕРВЕР <span className="neon-text-cyan">LIMERS</span>
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">Заходи к нам — здесь всегда есть с кем поиграть и что выиграть</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-12">
          <div className="relative rounded-xl overflow-hidden border border-[var(--card-border)]">
            <img src={MC_IMAGE} alt="Limers Minecraft Server" className="w-full h-64 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-bg)] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-sm font-medium">Сервер онлайн</span>
              </div>
              <div className="game-card rounded-lg px-4 py-2 border border-[var(--neon-cyan)] inline-block">
                <span className="font-orbitron text-sm text-[var(--neon-cyan)] tracking-wider">185.9.145.8:38251</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {SERVER_FEATURES.map((feature) => (
              <div key={feature.label} className="game-card rounded-lg p-4">
                <Icon name={feature.icon} size={22} className="text-[var(--neon-cyan)] mb-2" />
                <div className="font-semibold text-sm text-white mb-1">{feature.label}</div>
                <div className="text-xs text-gray-500">{feature.desc}</div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-[var(--card-border)] bg-[var(--card-bg)] py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <span className="font-orbitron font-black text-2xl neon-text-cyan animate-flicker">LIMERS</span>
            <div className="flex gap-4">
              <a
                href="https://www.youtube.com/@Limers_Studio"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded border border-[var(--card-border)] flex items-center justify-center text-gray-500 hover:text-[var(--neon-cyan)] hover:border-[var(--neon-cyan)] transition-all"
              >
                <Icon name="Youtube" size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded border border-[var(--card-border)] flex items-center justify-center text-gray-500 hover:text-[var(--neon-purple)] hover:border-[var(--neon-purple)] transition-all"
              >
                <Icon name="MessageCircle" size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded border border-[var(--card-border)] flex items-center justify-center text-gray-500 hover:text-[var(--neon-cyan)] hover:border-[var(--neon-cyan)] transition-all"
              >
                <Icon name="Music" size={18} />
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-[var(--card-border)]">
            <p className="text-gray-600 text-xs">© 2026 LIMERS. Все права защищены.</p>
            <p className="text-gray-700 text-xs font-orbitron">GAMING • STREAMING • MINECRAFT</p>
          </div>
        </div>
      </footer>
    </div>
  );
}