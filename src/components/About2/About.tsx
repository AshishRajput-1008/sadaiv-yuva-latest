import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Users, Flame, HeartHandshake } from 'lucide-react';
import styles from './About2.module.css';

export default function AboutSection() {
  const pillars = [
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Social Work & Outreach",
      description: "Dedicated community-driven initiatives uplifting youth, bridging educational divides, and empowering everyday citizens."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      title: "Sadaiv Cyber",
      description: "Building a cyber-secure Bharat through expert digital fraud prevention, workshops, masterclasses, and safety awareness."
    },
    {
      icon: <Flame className="w-6 h-6 text-amber-600" />,
      title: "Sadaiv Puja",
      description: "Preserving cultural roots and spiritual well-being by offering authentic Vedic rituals, online puja, and spiritual guidance."
    }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* Top Header Grid */}
        <div className={styles.topGrid}>
          
          {/* Left Column: Heading & Mission */}
          <div className={styles.leftColumn}>
            <div className={styles.badge}>
              <HeartHandshake className="w-4 h-4" />
              <span>Sadaiv Yuva Foundation Ecosystem</span>
            </div>
            
            <h2 className={styles.heading}>
              Empowering Society Through <span className={styles.headingHighlight}>Service, Security, & Tradition</span>.
            </h2>
            
            <p className={styles.description}>
              Sadaiv Yuva Foundation is a multidimensional non-profit organization committed to holistic societal growth. By seamlessly uniting grassroots social work, cutting-edge digital safety education via <strong>Sadaiv Cyber</strong>, and cultural preservation through <strong>Sadaiv Puja</strong>, we empower individuals across all stages of life.
            </p>

            <div className={styles.statsWrapper}>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>60,000+</div>
                <div className={styles.statLabel}>Lives Impacted</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>3 Pillars</div>
                <div className={styles.statLabel}>Unified Vision</div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual / Image Container */}
          <div className={styles.rightColumn}>
            <div className={styles.imageContainer}>
              <Image
                src="/images/foundation-outreach.jpg" 
                alt="Sadaiv Yuva Foundation Community Initiatives"
                fill
                className={styles.image}
                priority
              />
              <div className={styles.imageOverlay}>
                <div>
                  <p className={styles.quoteTag}>Our Unified Mission</p>
                  <p className={styles.quoteText}>&ldquo;Bridging modern security, traditional values, and social welfare for a stronger nation.&rdquo;</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom 3 Pillars Grid */}
        <div className={styles.pillarsGrid}>
          {pillars.map((item, index) => (
            <div key={index} className={styles.featureCard}>
              <div>
                <div className={styles.iconBox}>
                  {item.icon}
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}