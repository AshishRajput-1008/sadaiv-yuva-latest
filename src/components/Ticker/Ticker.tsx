import s from './Ticker.module.css';

const items = [
  { dot: 'sf', text: 'Education for All' },
  { dot: 'gr', text: 'Women Empowerment' },
  { dot: 'bl', text: 'Sustainable Livelihood' },
  { dot: 'sf', text: 'Free Health Camps' },
  { dot: 'gr', text: 'Digital Literacy' },
  { dot: 'bl', text: 'Puja & Havan Services' },
  { dot: 'sf', text: 'Cyber Awareness' },
  { dot: 'gr', text: 'Youth Leadership' },
  { dot: 'bl', text: 'Environmental Drives' },
  { dot: 'sf', text: 'Skill Development' },
];

export default function Ticker() {
  const doubled = [...items, ...items];
  return (
    <div className={s.ticker} aria-hidden="true">
      <div className={s.track}>
        {doubled.map((it, i) => (
          <div className={s.item} key={i}>
            <span className={`${s.dot} ${s[it.dot]}`} />
            {it.text}
          </div>
        ))}
      </div>
    </div>
  );
}
