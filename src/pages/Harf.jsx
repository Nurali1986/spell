import React, { useState } from "react";
import "./Harf.css";
import HarfModal from "./HarfModal";

import a from "../assets/harf/a.png";
import b from "../assets/harf/b.png";
import d from "../assets/harf/d.png";
import e from "../assets/harf/e.png";
import f from "../assets/harf/f.png";
import g from "../assets/harf/g.png";
import h from "../assets/harf/h.png";
import i from "../assets/harf/i.png";
import j from "../assets/harf/j.png";
import k from "../assets/harf/k.png";
import l from "../assets/harf/l.png";
import m from "../assets/harf/m.png";
import n from "../assets/harf/n.png";
import o from "../assets/harf/o.png";
import p from "../assets/harf/p.png";
import q from "../assets/harf/q.png";
import r from "../assets/harf/r.png";
import s from "../assets/harf/s.png";
import t from "../assets/harf/t.png";
import u from "../assets/harf/u.png";
import v from "../assets/harf/v.png";
import x from "../assets/harf/x.png";
import y from "../assets/harf/y.png";
import z from "../assets/harf/z.png";
import oApostrophe from "../assets/harf/o'.png";
import gApostrophe from "../assets/harf/g'.png";
import sh from "../assets/harf/sh.png";
import ch from "../assets/harf/ch.png";
import ng from "../assets/harf/ng.png";
import tutuq from "../assets/harf/tutuq.png";

// Sonlar
import zero from "../assets/harf/0.png";
import one from "../assets/harf/1.png";
import two from "../assets/harf/2.png";
import three from "../assets/harf/3.png";
import four from "../assets/harf/4.png";
import five from "../assets/harf/5.png";
import six from "../assets/harf/6.png";
import seven from "../assets/harf/7.png";
import eight from "../assets/harf/8.png";
import nine from "../assets/harf/9.png";

import a1 from "../assets/harf/a1.png";
import a2 from "../assets/harf/a2.png";
import a3 from "../assets/harf/a3.png";
import a4 from "../assets/harf/a4.png";

// O‘zbek alifbosi + sonlar
const items = [
  // Harflar
  { 
    label: "A a", 
    image: a,
    examples: ["Ananas", "Ayiq", "Akula", "Arpa"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "B b", 
    image: b,

    examples: ["Bola", "Barg", "Baliq", "Bino"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "D d", 
    image: d,
        examples: ["Daraxt", "Dengiz", "Daftar", "Dumaloq"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "E e", 
    image: e,
     examples: ["Eshik", "Egar", "Elen", "Eshak"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "F f", 
    image: f,
 
    examples: ["Futbol", "Fen", "Faryod", "Fotiha"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "G g", 
    image: g,

    examples: ["Gul", "Gap", "Gilos", "G'ildirak"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "H h", 
    image: h,

    examples: ["Havo", "Hona", "Hikoya", "Harf"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "I i", 
    image: i,

    examples: ["It", "Ip", "Ish", "Ichki"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "J j", 
    image: j,

    examples: ["Javob", "Jahon", "Jigar", "Jizza"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "K k", 
    image: k,
 
    examples: ["Kitob", "Kecha", "Kulfat", "Karta"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "L l", 
    image: l,
 
    examples: ["Lola", "Lampa", "Limon", "Loviya"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "M m", 
    image: m,
  
    examples: ["Mushuk", "Maktab", "Meva", "Mosh"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "N n", 
    image: n,

    examples: ["Non", "Nar", "Nish", "Nola"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "O o", 
    image: o,
 
    examples: ["Olma", "Olov", "Osh", "O'g'il"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "P p", 
    image: p,
  
    examples: ["Pichoq", "Pul", "Parda", "Piyola"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "Q q", 
    image: q,
 
    examples: ["Qalam", "Qish", "Quloq", "Qo'zi"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "R r", 
    image: r,
 
    examples: ["Ruchka", "Rang", "Rasm", "Rot"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "S s", 
    image: s,
 
    examples: ["Sabzi", "Sut", "Sichqon", "Sovg'a"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "T t", 
    image: t,
 
    examples: ["Tom", "Tish", "Tog'", "Tuxum"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "U u", 
    image: u,
 
    examples: ["Uy", "Uzum", "Uch", "Uq"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "V v", 
    image: v,
  
    examples: ["Vaza", "Vilka", "Vatan", "Vafo"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "X x", 
    image: x,
      examples: ["Xarita", "Xona", "Xurmo", "Xayol"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "Y y", 
    image: y,
     examples: ["Yog'", "Yoz", "Yashik", "Yomon"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "Z z", 
    image: z,
     examples: ["Zebra", "Zar", "Zamin", "Ziyon"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "O' o'", 
    image: oApostrophe,
     examples: ["O'rdak", "O'g'il", "O'rik", "O'ch"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "G' g'", 
    image: gApostrophe,
 
    examples: ["G'isht", "G'ildirak", "G'oyib", "G'urur"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "Sh sh", 
    image: sh,
 
    examples: ["Shaftoli", "Shamol", "Shahar", "Shapka"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "Ch ch", 
    image: ch,
 
    examples: ["Choy", "Chana", "Chiroq", "Chumoli"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "ng", 
    image: ng,
 
    examples: ["Ming", "Tong", "Yang", "Sing"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "'", 
    image: tutuq,
  
    examples: ["Ma'mur", "Ta'lim", "Ba'zi", "A'lo"],
    exampleImages: [a1, a2, a3, a4]
  },

  // Sonlar
  { 
    label: "0", 
    image: zero,
   
    examples: ["0 ta olma", "0 daraja", "0 so'm"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "1", 
    image: one,
  
    examples: ["1 ta kitob", "1 kun", "1 oy"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "2", 
    image: two,
  
    examples: ["2 ta stul", "2 kun", "2 oy"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "3", 
    image: three,

    examples: ["3 ta olma", "3 kun", "3 oy"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "4", 
    image: four,
  
    examples: ["4 ta stol", "4 kun", "4 oy"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "5", 
    image: five,
  
    examples: ["5 ta kitob", "5 kun", "5 oy"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "6", 
    image: six,
 
    examples: ["6 ta stul", "6 kun", "6 oy"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "7", 
    image: seven,
  
    examples: ["7 ta olma", "7 kun", "7 oy"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "8", 
    image: eight,
 
    examples: ["8 ta stol", "8 kun", "8 oy"],
    exampleImages: [a1, a2, a3, a4]
  },
  { 
    label: "9", 
    image: nine,
   
    examples: ["9 ta kitob", "9 kun", "9 oy"],
    exampleImages: [a1, a2, a3, a4]
  }
];

export default function Harf() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <>
      <div className="harf-container">
        {items.map((item, index) => (
          <div 
            key={index} 
            className="harf-card"
            onClick={() => handleCardClick(item)}
          >
            <div className="harf-top">{item.label}</div>
            <img 
              src={item.image} 
              alt={item.label} 
              className="harf-img"
              onError={(e) => {
                console.error(`Rasm topilmadi: ${item.label}`);
                e.target.style.display = 'none';
              }}
            />
          </div>
        ))}
      </div>

      <HarfModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        card={selectedCard}
      />
    </>
  );
}
