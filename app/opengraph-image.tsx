import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'EPS Corner — EPS-TOPIK, KLT & SCBT Reviewer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        background: '#0A1F3D',
        color: '#F5F3ED',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            border: '2px solid #F5B935',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#F5B935',
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          EC
        </div>
        <div style={{ fontSize: 24, fontWeight: 700 }}>EPS Corner</div>
      </div>
      <div
        style={{
          fontSize: 58,
          fontWeight: 800,
          lineHeight: 1.1,
          maxWidth: 900,
        }}
      >
        Study like the exam is already{' '}
        <span style={{ color: '#F5B935' }}>graded.</span>
      </div>
      <div
        style={{ fontSize: 26, color: '#9FB3D6', marginTop: 28, maxWidth: 820 }}
      >
        EPS-TOPIK · KLT · SCBT reviewer for workers preparing for jobs in Korea
      </div>
    </div>,
    { ...size },
  );
}
