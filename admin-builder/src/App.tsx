import React, { useState, useCallback } from 'react';
import { Editor, Frame, Element, useEditor, useNode } from '@craftjs/core';

// ═══════════════════════════════════════════════════════════
//  BLOCK DEFINITIONS
// ═══════════════════════════════════════════════════════════

// ── Container ───────────────────────────────────────────────
const Container = ({ children, padding = '40px', background = '#fff' }: any) => {
  const { connectors: { connect, drag } } = useNode();
  return (
    <div
      ref={(ref: any) => connect(drag(ref))}
      style={{ padding, background, minHeight: '60px' }}
    >
      {children}
    </div>
  );
};
Container.craft = {
  props: { padding: '40px', background: '#fff' },
  displayName: 'Container',
};

// ── HeroSection ─────────────────────────────────────────────
const HeroSection = ({ title = 'Hero Title', subtitle = 'Subtitle text here.', ctaLabel = 'Get Started', ctaUrl = '#', bgColor = '#173052' }: any) => {
  const { connectors: { connect, drag } } = useNode();
  return (
    <div ref={(ref: any) => connect(drag(ref))} className="preview-hero" style={{ background: bgColor }}>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
      {ctaLabel && <a href={ctaUrl} className="preview-btn">{ctaLabel}</a>}
    </div>
  );
};
HeroSection.craft = {
  props: { title: 'Hero Title', subtitle: 'Subtitle text here.', ctaLabel: 'Get Started', ctaUrl: '#', bgColor: '#173052' },
  displayName: 'Hero Section',
  related: { settings: HeroSettings },
};

function HeroSettings() {
  const { actions: { setProp }, props } = useNode(n => ({ props: n.data.props }));
  return (
    <div>
      <div className="prop-section-title">Hero Section</div>
      {[
        { key: 'title', label: 'Title' },
        { key: 'subtitle', label: 'Subtitle' },
        { key: 'ctaLabel', label: 'Button Label' },
        { key: 'ctaUrl', label: 'Button URL' },
        { key: 'bgColor', label: 'Background Color' },
      ].map(({ key, label }) => (
        <div key={key} className="prop-group">
          <label className="prop-label">{label}</label>
          <input
            className="prop-input"
            value={props[key] || ''}
            onChange={e => setProp((p: any) => (p[key] = e.target.value))}
          />
        </div>
      ))}
    </div>
  );
}

// ── ServicesGrid ─────────────────────────────────────────────
const ServicesGrid = ({ columns = 3, title = 'Our Services', subtitle = '' }: any) => {
  const { connectors: { connect, drag } } = useNode();
  return (
    <div ref={(ref: any) => connect(drag(ref))} className="preview-section">
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
      <div className={`preview-grid preview-grid-${columns}`}>
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="preview-card">
            <h3>Service {i + 1}</h3>
            <p>Service description goes here. Edit in properties panel.</p>
          </div>
        ))}
      </div>
    </div>
  );
};
ServicesGrid.craft = {
  props: { columns: 3, title: 'Our Services', subtitle: '' },
  displayName: 'Services Grid',
  related: { settings: GridSettings },
};

function GridSettings() {
  const { actions: { setProp }, props } = useNode(n => ({ props: n.data.props }));
  return (
    <div>
      <div className="prop-section-title">Grid Block</div>
      <div className="prop-group">
        <label className="prop-label">Title</label>
        <input className="prop-input" value={props.title || ''} onChange={e => setProp((p: any) => (p.title = e.target.value))} />
      </div>
      <div className="prop-group">
        <label className="prop-label">Subtitle</label>
        <input className="prop-input" value={props.subtitle || ''} onChange={e => setProp((p: any) => (p.subtitle = e.target.value))} />
      </div>
      <div className="prop-group">
        <label className="prop-label">Columns (2–4)</label>
        <input className="prop-input" type="number" min={2} max={4} value={props.columns || 3} onChange={e => setProp((p: any) => (p.columns = Number(e.target.value)))} />
      </div>
    </div>
  );
}

// ── StatsBar ─────────────────────────────────────────────────
const StatsBarBlock = ({ stat1 = '3.6K', label1 = 'Projects done', stat2 = '285+', label2 = 'Happy clients', stat3 = '59%', label3 = 'Growth over year', stat4 = '28+', label4 = 'Awards', columns = 4 }: any) => {
  const { connectors: { connect, drag } } = useNode();
  const stats = [[stat1, label1], [stat2, label2], [stat3, label3], [stat4, label4]].slice(0, columns);
  return (
    <div ref={(ref: any) => connect(drag(ref))} className="preview-stats" style={{ gridTemplateColumns: `repeat(${columns},1fr)` }}>
      {stats.map(([v, l], i) => (
        <div key={i} className="stat">
          <span className="stat-value">{v}</span>
          <span className="stat-label">{l}</span>
        </div>
      ))}
    </div>
  );
};
StatsBarBlock.craft = { props: { stat1: '3.6K', label1: 'Projects done', stat2: '285+', label2: 'Happy clients', stat3: '59%', label3: 'Growth', stat4: '28+', label4: 'Awards', columns: 4 }, displayName: 'Stats Bar' };

// ── CTABand ───────────────────────────────────────────────────
const CTABandBlock = ({ title = 'Let\'s keep the conversation going', buttonLabel = 'Contact Us', buttonUrl = '/contact', bgColor = '#173052' }: any) => {
  const { connectors: { connect, drag } } = useNode();
  return (
    <div ref={(ref: any) => connect(drag(ref))} className="preview-cta" style={{ background: bgColor }}>
      <h2>{title}</h2>
      {buttonLabel && <a href={buttonUrl} className="preview-btn">{buttonLabel}</a>}
    </div>
  );
};
CTABandBlock.craft = { props: { title: 'Let\'s keep the conversation going', buttonLabel: 'Contact Us', buttonUrl: '/contact', bgColor: '#173052' }, displayName: 'CTA Band' };

// ── RichText ──────────────────────────────────────────────────
const RichText = ({ content = '<p>Add your content here…</p>' }: any) => {
  const { connectors: { connect, drag } } = useNode();
  return (
    <div
      ref={(ref: any) => connect(drag(ref))}
      style={{ padding: '40px', lineHeight: 1.7, color: '#333' }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
RichText.craft = { props: { content: '<p>Add your content here…</p>' }, displayName: 'Rich Text' };

// ── Spacer ────────────────────────────────────────────────────
const Spacer = ({ height = '40px' }: any) => {
  const { connectors: { connect, drag } } = useNode();
  return <div ref={(ref: any) => connect(drag(ref))} style={{ height, background: 'transparent' }} />;
};
Spacer.craft = { props: { height: '40px' }, displayName: 'Spacer' };

// ═══════════════════════════════════════════════════════════
//  BLOCK CATALOGUE
// ═══════════════════════════════════════════════════════════
const BLOCKS = [
  { label: 'Hero', icon: '🖼️', component: HeroSection },
  { label: 'Services Grid', icon: '📦', component: ServicesGrid },
  { label: 'Stats Bar', icon: '📊', component: StatsBarBlock },
  { label: 'CTA Band', icon: '📣', component: CTABandBlock },
  { label: 'Rich Text', icon: '✏️', component: RichText },
  { label: 'Container', icon: '📐', component: Container },
  { label: 'Spacer', icon: '↕️', component: Spacer },
];

// ═══════════════════════════════════════════════════════════
//  TOOLBAR (uses editor hooks — must live inside <Editor>)
// ═══════════════════════════════════════════════════════════
function BuilderToolbar({ pageName }: { pageName: string }) {
  const { actions, query } = useEditor();

  const handleSave = useCallback(async () => {
    const json = query.serialize();
    try {
      await fetch('/api/builder/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: pageName, layout_json: json }),
      });
      alert('✓ Layout saved!');
    } catch {
      alert('Save failed — running in dev mode without edge functions.');
      console.log('[DEV] Layout JSON:', json);
    }
  }, [query, pageName]);

  return (
    <div className="builder-topbar-actions">
      <button className="btn-builder" onClick={() => actions.history.undo()}>↩ Undo</button>
      <button className="btn-builder" onClick={() => actions.history.redo()}>↪ Redo</button>
      <button className="btn-builder success" onClick={handleSave}>💾 Save</button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  SETTINGS PANEL
// ═══════════════════════════════════════════════════════════
function SettingsPanel() {
  const { selected } = useEditor((state) => {
    const [currentNodeId] = state.events.selected;
    let selected: any = null;
    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.displayName,
        settings: state.nodes[currentNodeId].related?.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }
    return { selected };
  });
  const { actions, query } = useEditor();

  if (!selected) {
    return (
      <div style={{ padding: '16px', color: '#64748b', fontSize: '13px', textAlign: 'center', marginTop: '40px' }}>
        <div style={{ fontSize: '2rem', marginBottom: '8px' }}>👆</div>
        Click a block on the canvas to edit its properties
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span style={{ fontWeight: 600, color: '#c4b5fd' }}>{selected.name}</span>
        {selected.isDeletable && (
          <button
            className="btn-builder danger"
            style={{ padding: '4px 10px', fontSize: '11px' }}
            onClick={() => actions.delete(selected.id)}
          >🗑 Delete</button>
        )}
      </div>
      {selected.settings && React.createElement(selected.settings)}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  MAIN APP
// ═══════════════════════════════════════════════════════════
const resolver = {
  HeroSection,
  ServicesGrid,
  StatsBarBlock,
  CTABandBlock,
  RichText,
  Container,
  Spacer,
};

export default function App() {
  const [pageName, setPageName] = useState('homepage');

  return (
    <Editor resolver={resolver} onRender={({ render }) => render}>
      <div className="builder-layout">
        {/* Topbar */}
        <header className="builder-topbar">
          <div className="builder-topbar-brand">
            <span>⚡</span> fotisp <span>Builder</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
            <label style={{ fontSize: '12px', color: '#64748b' }}>Page:</label>
            <select
              className="prop-input"
              style={{ width: '200px' }}
              value={pageName}
              onChange={e => setPageName(e.target.value)}
            >
              <option value="homepage">Homepage</option>
              <option value="about">About Us</option>
              <option value="services">Services</option>
              <option value="contact">Contact</option>
            </select>
          </div>
          <BuilderToolbar pageName={pageName} />
        </header>

        {/* Left Panel — Blocks */}
        <aside className="builder-panel-left">
          <p className="panel-title">Blocks</p>
          <div className="blocks-grid">
            {BLOCKS.map(({ label, icon }) => (
              <div
                key={label}
                className="block-tile"
              >
                <span className="block-tile-icon">{icon}</span>
                {label}
              </div>
            ))}
          </div>
          <p className="panel-title" style={{ marginTop: '24px' }}>Drag blocks to canvas →</p>
        </aside>

        {/* Canvas */}
        <main className="builder-canvas">
          <div className="builder-canvas-inner">
            <Frame>
              <Element is={Container} canvas padding="0" background="#fff">
                <HeroSection
                  title="Each day, our people are shaping growth strategies."
                  subtitle="Get in touch to learn how we can help."
                  ctaLabel="Get in touch"
                />
                <ServicesGrid title="Our Most Popular Services" columns={3} />
                <CTABandBlock title="Let's keep the conversation going" buttonLabel="Contact Us" />
              </Element>
            </Frame>
          </div>
        </main>

        {/* Right Panel — Properties */}
        <aside className="builder-panel-right">
          <p className="panel-title">Properties</p>
          <SettingsPanel />
        </aside>
      </div>
    </Editor>
  );
}
