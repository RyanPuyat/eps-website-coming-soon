'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is EPS-TOPIK?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EPS-TOPIK is the Korean language proficiency exam required for foreign workers from 17 partner countries applying to work in Korea under the Employment Permit System (EPS). Passing it is one of the first steps toward an EPS job placement.',
      },
    },
    {
      '@type': 'Question',
      name: "What's the difference between KLT and EPS-TOPIK?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'KLT (Korean Language Test) is a newer, streamlined version of the language exam used in more recent EPS hiring rounds, while EPS-TOPIK was the original format. EPS Corner covers both.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is SCBT and which categories does it cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SCBT (Skills Competency-Based Test) evaluates job-specific knowledge after you pass the language exam. EPS Corner covers all eight SCBT categories: chemical, electronics, food manufacturing, machinery, metal, paper, rubber, and textile.',
      },
    },
    {
      '@type': 'Question',
      name: 'When does EPS Corner launch?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EPS Corner is in final testing now. Joining the waitlist sends you an email the moment free and premium reviewers are available.',
      },
    },
  ],
};

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong. Try again.');
      }

      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error ? err.message : 'Something went wrong. Try again.',
      );
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <nav className="wrap">
        <Link href="/" className="brand">
          <span className="logo-mark">EPS Corner</span>
        </Link>
        <div className="nav-tag">Opening soon</div>
      </nav>

      <main className="wrap hero">
        <div>
          <div className="eyebrow">EPS-TOPIK · KLT · SCBT 시험 준비</div>
          <h1>
            Study like the exam
            <br />
            is already <em>graded.</em>
          </h1>
          <p className="lede">
            EPS Corner is a Korean exam-prep platform built around real
            EPS-TOPIK, KLT, and SCBT question formats — for Filipino workers
            preparing for their shot at employment in Korea.
          </p>

          <div className="exams">
            <div className="exam-chip">
              <b>EPS-TOPIK</b> · language proficiency
            </div>
            <div className="exam-chip">
              <b>KLT</b> · Korean language test
            </div>
            <div className="exam-chip">
              <b>SCBT</b> · skills competency
            </div>
          </div>

          <div className="form-block">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="you@email.com"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                className="cta"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Saving…' : 'Join the waitlist'}
              </button>
            </form>
            <p className="form-note">
              No spam — just an email when EPS Corner opens.{' '}
              <strong>Free tier</strong> available at launch.
            </p>
            <div
              className={`success-msg ${status === 'success' ? 'show' : ''}`}
            >
              ✓ You&apos;re on the list. See you at launch.
            </div>
            {status === 'error' && <p className="error-msg">{errorMsg}</p>}
          </div>
        </div>

        <div className="sheet-holder">
          <div className="sheet">
            <div className="sheet-head">
              EPS-TOPIK · Reading &nbsp;<span>Section 2 of 4</span>
            </div>

            <div className="q-row">
              <div className="q-label">
                <b>Q17.</b> 다음 밑줄 친 부분과 의미가 가장 비슷한 것을
                고르십시오.
              </div>
              <div className="bubbles">
                <div className="bubble">①</div>
                <div className="bubble filled">②</div>
                <div className="bubble">③</div>
                <div className="bubble">④</div>
              </div>
            </div>

            <div className="q-row">
              <div className="q-label">
                <b>Q18.</b> 안전 표지판이 나타내는 의미로 알맞은 것은?
              </div>
              <div className="bubbles">
                <div className="bubble">①</div>
                <div className="bubble">②</div>
                <div className="bubble">③</div>
                <div className="bubble">④</div>
              </div>
            </div>

            <div className="sheet-foot">
              <div className="score-tag">
                <span className="dot"></span>Auto-graded
              </div>
              <div className="sheet-id">SET-014</div>
            </div>
          </div>
        </div>
      </main>

      <div className="strip wrap">
        <div className="strip-inner">
          <div className="strip-item">
            <span className="num">EPS-TOPIK</span>
            <h3>Full practice sets</h3>
            <p>
              Reading and listening sections structured to match the real exam
              format — not just flashcards.
            </p>
          </div>
          <div className="strip-item">
            <span className="num">KLT</span>
            <h3>Vocabulary & grammar</h3>
            <p>
              Built from the same course material and units used to actually
              pass, unit by unit.
            </p>
          </div>
          <div className="strip-item">
            <span className="num">SCBT</span>
            <h3>All 8 job categories</h3>
            <p>
              Chemical, electronics, food, machinery, metal, paper, rubber, and
              textile — covered individually.
            </p>
          </div>
        </div>
      </div>

      <div className="faq wrap">
        <h2>Common questions</h2>

        <div className="faq-item">
          <h3>What is EPS-TOPIK?</h3>
          <p>
            EPS-TOPIK is the Korean language proficiency exam required for
            foreign workers from 17 partner countries applying to work in Korea
            under the Employment Permit System (EPS). Passing it is one of the
            first steps toward an EPS job placement.
          </p>
        </div>

        <div className="faq-item">
          <h3>What&apos;s the difference between KLT and EPS-TOPIK?</h3>
          <p>
            KLT (Korean Language Test) is a newer, streamlined version of the
            language exam used in more recent EPS hiring rounds, while EPS-TOPIK
            was the original format. EPS Corner covers both, since which one
            applies depends on your specific hiring round.
          </p>
        </div>

        <div className="faq-item">
          <h3>What is SCBT and which categories does it cover?</h3>
          <p>
            SCBT (Skills Competency-Based Test) evaluates job-specific knowledge
            after you pass the language exam. EPS Corner will cover all eight
            SCBT categories: chemical, electronics, food manufacturing,
            machinery, metal, paper, rubber, and textile.
          </p>
        </div>

        <div className="faq-item">
          <h3>When does EPS Corner launch?</h3>
          <p>
            EPS Corner is in final testing now. Join the waitlist above and
            you&apos;ll get an email the moment free and premium reviewers are
            available.
          </p>
        </div>
      </div>

      <footer className="wrap">
        <div>
          © 2026 EPS Corner. Built for workers preparing to work abroad.
        </div>
        <div>
          <a href="mailto:hello@epscorner.com">hello@epscorner.com</a>
        </div>
      </footer>
    </>
  );
}
