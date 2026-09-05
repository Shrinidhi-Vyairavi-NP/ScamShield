import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { ScamRadarItem, ThemeMode, LanguageOption } from '../types';
import { t } from '../lib/i18n';
import { MapPin, ShieldAlert, Zap, Filter, Compass, AlertTriangle, ChevronRight, Layers, Eye } from 'lucide-react';

interface GeoHotspot {
  id: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
  xRatio: number; // fallback % coordinates for scalable map projection
  yRatio: number;
  scamType: string;
  categoryKey: 'job' | 'parcel' | 'digital_arrest' | 'banking' | 'utility' | 'lottery';
  threatLevel: 'CRITICAL' | 'HIGH' | 'MODERATE';
  incidentCount: number;
  threatVelocity: string;
  topTargetPersona: string;
  topSnippet: string;
}

// Comprehensive database of Indian Regional Hotspots for scam types
const REGIONAL_HOTSPOTS: GeoHotspot[] = [
  {
    id: 'hotspot-delhi',
    name: 'Delhi-NCR (Delhi, Gurugram, Noida)',
    state: 'Delhi-NCR',
    lat: 28.6139,
    lng: 77.2090,
    xRatio: 0.38,
    yRatio: 0.28,
    scamType: 'Digital Arrest & CBI Coercion',
    categoryKey: 'digital_arrest',
    threatLevel: 'CRITICAL',
    incidentCount: 3420,
    threatVelocity: '+380% this week',
    topTargetPersona: 'Senior Citizens & Retired Officials',
    topSnippet: 'Skype/Video call from fake Narcotics Bureau threatening immediate warrant under Sec 420...'
  },
  {
    id: 'hotspot-mumbai',
    name: 'Mumbai & Pune Hub',
    state: 'Maharashtra',
    lat: 19.0760,
    lng: 72.8777,
    xRatio: 0.25,
    yRatio: 0.58,
    scamType: 'SBI & HDFC Bank KYC Expiry',
    categoryKey: 'banking',
    threatLevel: 'CRITICAL',
    incidentCount: 4890,
    threatVelocity: '+210% today',
    topTargetPersona: 'General Citizens & Business Owners',
    topSnippet: 'Urgent SMS: Your SBI Account will be blocked tonight at 10 PM. Verify immediately via link...'
  },
  {
    id: 'hotspot-bengaluru',
    name: 'Bengaluru IT Corridor',
    state: 'Karnataka',
    lat: 12.9716,
    lng: 77.5946,
    xRatio: 0.36,
    yRatio: 0.78,
    scamType: 'FedEx Customs & International Parcel Scam',
    categoryKey: 'parcel',
    threatLevel: 'CRITICAL',
    incidentCount: 2950,
    threatVelocity: '+175% this week',
    topTargetPersona: 'IT Professionals & Students',
    topSnippet: 'FedEx Customs alert: Your parcel containing contraband drugs detained at Mumbai airport...'
  },
  {
    id: 'hotspot-chennai',
    name: 'Chennai & Coimbatore',
    state: 'Tamil Nadu',
    lat: 13.0827,
    lng: 80.2707,
    xRatio: 0.44,
    yRatio: 0.82,
    scamType: 'Telegram WFH Video Like Task',
    categoryKey: 'job',
    threatLevel: 'HIGH',
    incidentCount: 3120,
    threatVelocity: '+290% today',
    topTargetPersona: 'Students & Homemakers',
    topSnippet: 'Earn Rs 4,000 daily for YouTube video likes on Telegram. Initial payout transferred then money demanded...'
  },
  {
    id: 'hotspot-kolkata',
    name: 'Kolkata & Asansol Region',
    state: 'West Bengal',
    lat: 22.5726,
    lng: 88.3639,
    xRatio: 0.72,
    yRatio: 0.46,
    scamType: 'KBC 25 Lakh WhatsApp Lottery',
    categoryKey: 'lottery',
    threatLevel: 'HIGH',
    incidentCount: 2140,
    threatVelocity: '+120% this week',
    topTargetPersona: 'General Citizens',
    topSnippet: 'Congratulations! Your mobile number won Rs 25 Lakh in KBC Kismat lottery. Pay Rs 2500 processing fee...'
  },
  {
    id: 'hotspot-ahmedabad',
    name: 'Ahmedabad & Surat Industrial',
    state: 'Gujarat',
    lat: 23.0225,
    lng: 72.5714,
    xRatio: 0.22,
    yRatio: 0.44,
    scamType: 'Electricity Bill Cut-Off APK Scam',
    categoryKey: 'utility',
    threatLevel: 'HIGH',
    incidentCount: 1870,
    threatVelocity: '+195% today',
    topTargetPersona: 'Business Owners & Seniors',
    topSnippet: 'Electricity power supply will be disconnected at 10 PM tonight due to unpaid bill. Install APK to pay...'
  },
  {
    id: 'hotspot-hyderabad',
    name: 'Hyderabad Cyberabad Region',
    state: 'Telangana',
    lat: 17.3850,
    lng: 78.4867,
    xRatio: 0.40,
    yRatio: 0.64,
    scamType: 'Part-Time Amazon & Telegram Rating',
    categoryKey: 'job',
    threatLevel: 'HIGH',
    incidentCount: 2680,
    threatVelocity: '+240% this week',
    topTargetPersona: 'Job Seekers & Youth',
    topSnippet: 'Part-time merchant rating job. Earn Rs 500 per order completed on Telegram channel...'
  },
  {
    id: 'hotspot-patna',
    name: 'Patna & Gaya Belt',
    state: 'Bihar',
    lat: 25.5941,
    lng: 85.1376,
    xRatio: 0.62,
    yRatio: 0.38,
    scamType: 'Fake Army / CISF OLX Vehicle Deposit',
    categoryKey: 'lottery',
    threatLevel: 'MODERATE',
    incidentCount: 1450,
    threatVelocity: '+85% today',
    topTargetPersona: 'General Buyers',
    topSnippet: 'Selling Army Officer second-hand bike at 50% discount. Pay Rs 3,000 gate pass deposit...'
  },
  {
    id: 'hotspot-jaipur',
    name: 'Jaipur & Mewat Border',
    state: 'Rajasthan',
    lat: 26.9124,
    lng: 75.7873,
    xRatio: 0.30,
    yRatio: 0.35,
    scamType: 'Sextortion & Fake Nude Call Sextortion',
    categoryKey: 'digital_arrest',
    threatLevel: 'HIGH',
    incidentCount: 2210,
    threatVelocity: '+160% this week',
    topTargetPersona: 'General Citizens & Businessmen',
    topSnippet: 'WhatsApp video call extortion from fake Police Officer threatening public release...'
  },
  {
    id: 'hotspot-chandigarh',
    name: 'Chandigarh & Ludhiana',
    state: 'Punjab',
    lat: 30.7333,
    lng: 76.7794,
    xRatio: 0.35,
    yRatio: 0.20,
    scamType: 'Canada Work Visa & Overseas Grant Fraud',
    categoryKey: 'job',
    threatLevel: 'CRITICAL',
    incidentCount: 1980,
    threatVelocity: '+310% this week',
    topTargetPersona: 'Youth & Job Seekers',
    topSnippet: 'Guaranteed Canada Work Permit & Express Entry Visa without IELTS. Advance deposit needed...'
  }
];

interface D3ScamGeoMapProps {
  themeMode?: ThemeMode;
  selectedLanguage: LanguageOption;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  radarItems: ScamRadarItem[];
}

export const D3ScamGeoMap: React.FC<D3ScamGeoMapProps> = ({
  themeMode = 'dark',
  selectedLanguage,
  selectedCategory,
  setSelectedCategory,
  selectedRegion,
  setSelectedRegion,
  radarItems
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredHotspot, setHoveredHotspot] = useState<GeoHotspot | null>(null);
  const [activeViewMode, setActiveViewMode] = useState<'spatial' | 'matrix' | 'leaderboard'>('spatial');

  const isDark = themeMode === 'dark';

  // Filter hotspots based on user selected category
  const filteredHotspots = REGIONAL_HOTSPOTS.filter(h => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'job' && h.categoryKey === 'job') return true;
    if (selectedCategory === 'parcel' && h.categoryKey === 'parcel') return true;
    if (selectedCategory === 'digital_arrest' && h.categoryKey === 'digital_arrest') return true;
    if (selectedCategory === 'banking' && h.categoryKey === 'banking') return true;
    if (selectedCategory === 'utility' && h.categoryKey === 'utility') return true;
    if (selectedCategory === 'lottery' && h.categoryKey === 'lottery') return true;
    return false;
  });

  // D3 Map Effect for SVG Rendering
  useEffect(() => {
    if (!svgRef.current || activeViewMode !== 'spatial') return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = containerRef.current?.clientWidth || 700;
    const height = 480;

    svg.attr('viewBox', `0 0 ${width} ${height}`);

    const g = svg.append('g');

    // Render Grid Background lines
    const gridG = g.append('g').attr('class', 'grid-lines');
    for (let x = 0; x < width; x += 40) {
      gridG.append('line')
        .attr('x1', x)
        .attr('y1', 0)
        .attr('x2', x)
        .attr('y2', height)
        .attr('stroke', isDark ? 'rgba(51, 65, 85, 0.25)' : 'rgba(203, 213, 225, 0.5)')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '2,4');
    }
    for (let y = 0; y < height; y += 40) {
      gridG.append('line')
        .attr('x1', 0)
        .attr('y1', y)
        .attr('x2', width)
        .attr('y2', y)
        .attr('stroke', isDark ? 'rgba(51, 65, 85, 0.25)' : 'rgba(203, 213, 225, 0.5)')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '2,4');
    }

    // Stylized India Subcontinent Outline Path (Stylized Geo Polygon)
    const indiaOutlinePath = `
      M ${width * 0.32} ${height * 0.12}
      L ${width * 0.42} ${height * 0.14}
      L ${width * 0.52} ${height * 0.22}
      L ${width * 0.76} ${height * 0.38}
      L ${width * 0.82} ${height * 0.45}
      L ${width * 0.70} ${height * 0.52}
      L ${width * 0.58} ${height * 0.58}
      L ${width * 0.46} ${height * 0.88}
      L ${width * 0.42} ${height * 0.88}
      L ${width * 0.34} ${height * 0.75}
      L ${width * 0.22} ${height * 0.62}
      L ${width * 0.18} ${height * 0.44}
      L ${width * 0.26} ${height * 0.32}
      L ${width * 0.28} ${height * 0.20}
      Z
    `;

    g.append('path')
      .attr('d', indiaOutlinePath)
      .attr('fill', isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(241, 245, 249, 0.9)')
      .attr('stroke', isDark ? 'rgba(56, 189, 248, 0.35)' : 'rgba(37, 99, 235, 0.35)')
      .attr('stroke-width', 2)
      .attr('stroke-linejoin', 'round')
      .attr('filter', isDark ? 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.15))' : 'none');

    // Max scale for bubble radius
    const maxIncidents = d3.max(REGIONAL_HOTSPOTS, d => d.incidentCount) || 5000;
    const radiusScale = d3.scaleSqrt().domain([0, maxIncidents]).range([8, 28]);

    // Render Hotspot Nodes with D3
    const nodeG = g.append('g').attr('class', 'hotspot-nodes');

    filteredHotspots.forEach(hotspot => {
      const cx = width * hotspot.xRatio;
      const cy = height * hotspot.yRatio;
      const radius = radiusScale(hotspot.incidentCount);
      const isSelected = selectedRegion.toLowerCase().includes(hotspot.state.toLowerCase()) || 
                         selectedRegion.toLowerCase().includes(hotspot.name.toLowerCase());

      const color = hotspot.threatLevel === 'CRITICAL' 
        ? '#f43f5e' 
        : hotspot.threatLevel === 'HIGH' 
        ? '#f59e0b' 
        : '#06b6d4';

      // Pulsing outer ring
      nodeG.append('circle')
        .attr('cx', cx)
        .attr('cy', cy)
        .attr('r', radius + 12)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', 1.5)
        .attr('opacity', isSelected ? 0.9 : 0.4)
        .attr('class', 'animate-pulse');

      if (hotspot.threatLevel === 'CRITICAL') {
        nodeG.append('circle')
          .attr('cx', cx)
          .attr('cy', cy)
          .attr('r', radius + 22)
          .attr('fill', 'none')
          .attr('stroke', color)
          .attr('stroke-width', 1)
          .attr('stroke-dasharray', '3,3')
          .attr('opacity', 0.3);
      }

      // Main Hotspot Bubble
      const mainBubble = nodeG.append('circle')
        .attr('cx', cx)
        .attr('cy', cy)
        .attr('r', radius)
        .attr('fill', color)
        .attr('fill-opacity', isSelected ? 0.85 : 0.6)
        .attr('stroke', isDark ? '#0f172a' : '#ffffff')
        .attr('stroke-width', 2)
        .style('cursor', 'pointer')
        .style('transition', 'all 0.2s ease');

      // Center Pin Dot
      nodeG.append('circle')
        .attr('cx', cx)
        .attr('cy', cy)
        .attr('r', 3)
        .attr('fill', '#ffffff')
        .style('pointer-events', 'none');

      // Label text
      nodeG.append('text')
        .attr('x', cx)
        .attr('y', cy - radius - 6)
        .attr('text-anchor', 'middle')
        .attr('fill', isDark ? '#f8fafc' : '#0f172a')
        .attr('font-size', '10px')
        .attr('font-weight', '800')
        .style('pointer-events', 'none')
        .style('text-shadow', isDark ? '0 1px 3px rgba(0,0,0,0.9)' : '0 1px 2px rgba(255,255,255,0.9)')
        .text(hotspot.name.split('(')[0].trim());

      // Interactive Events
      mainBubble
        .on('mouseover', (event) => {
          d3.select(event.currentTarget)
            .attr('fill-opacity', 0.95)
            .attr('r', radius + 4);
          setHoveredHotspot(hotspot);
        })
        .on('mouseout', (event) => {
          d3.select(event.currentTarget)
            .attr('fill-opacity', isSelected ? 0.85 : 0.6)
            .attr('r', radius);
        })
        .on('click', () => {
          if (selectedRegion === hotspot.state) {
            setSelectedRegion('all');
          } else {
            setSelectedRegion(hotspot.state);
          }
        });
    });

  }, [filteredHotspots, isDark, selectedRegion, activeViewMode]);

  return (
    <div className={`border rounded-2xl p-5 shadow-lg transition-all ${
      isDark ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
    }`}>
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/50">
        <div>
          <div className="flex items-center space-x-2">
            <Compass className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-blue-700'}`} />
            <h2 className="text-lg font-black tracking-wide">
              {t('geoMapTitle', selectedLanguage)}
            </h2>
            <span className="bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded text-[10px] font-mono font-bold animate-pulse">
              LIVE D3.JS TELEMETRY
            </span>
          </div>
          <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {t('geoMapSubtitle', selectedLanguage)}
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className={`inline-flex p-1 rounded-xl border text-xs font-bold ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            onClick={() => setActiveViewMode('spatial')}
            className={`px-3 py-1.5 rounded-lg cursor-pointer transition-all ${
              activeViewMode === 'spatial'
                ? isDark ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold' : 'bg-blue-700 text-white shadow-md font-extrabold'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Spatial Map
          </button>
          <button
            onClick={() => setActiveViewMode('matrix')}
            className={`px-3 py-1.5 rounded-lg cursor-pointer transition-all ${
              activeViewMode === 'matrix'
                ? isDark ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold' : 'bg-blue-700 text-white shadow-md font-extrabold'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Scam Type Matrix
          </button>
          <button
            onClick={() => setActiveViewMode('leaderboard')}
            className={`px-3 py-1.5 rounded-lg cursor-pointer transition-all ${
              activeViewMode === 'leaderboard'
                ? isDark ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold' : 'bg-blue-700 text-white shadow-md font-extrabold'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Hotspot Leaderboard
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 my-4">
        <span className={`text-xs font-bold flex items-center space-x-1 mr-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          <Filter className="w-3.5 h-3.5" />
          <span>Scam Type:</span>
        </span>

        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-slate-800 text-white border-2 border-cyan-400 dark:bg-cyan-500/20 dark:text-cyan-300'
              : isDark ? 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200' : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
          }`}
        >
          {t('filterAllCategories', selectedLanguage)}
        </button>

        <button
          onClick={() => setSelectedCategory('digital_arrest')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
            selectedCategory === 'digital_arrest'
              ? 'bg-rose-600 text-white border border-rose-400 shadow-sm'
              : isDark ? 'bg-rose-950/40 text-rose-300 border border-rose-800 hover:bg-rose-900/50' : 'bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100'
          }`}
        >
          🚨 {t('filterDigitalArrest', selectedLanguage)}
        </button>

        <button
          onClick={() => setSelectedCategory('job')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
            selectedCategory === 'job'
              ? 'bg-purple-600 text-white border border-purple-400 shadow-sm'
              : isDark ? 'bg-purple-950/40 text-purple-300 border border-purple-800 hover:bg-purple-900/50' : 'bg-purple-50 text-purple-800 border border-purple-200 hover:bg-purple-100'
          }`}
        >
          💼 {t('filterJobFraud', selectedLanguage)}
        </button>

        <button
          onClick={() => setSelectedCategory('parcel')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
            selectedCategory === 'parcel'
              ? 'bg-amber-600 text-white border border-amber-400 shadow-sm'
              : isDark ? 'bg-amber-950/40 text-amber-300 border border-amber-800 hover:bg-amber-900/50' : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
          }`}
        >
          📦 {t('filterParcelCustoms', selectedLanguage)}
        </button>

        <button
          onClick={() => setSelectedCategory('banking')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
            selectedCategory === 'banking'
              ? 'bg-cyan-600 text-white border border-cyan-400 shadow-sm'
              : isDark ? 'bg-cyan-950/40 text-cyan-300 border border-cyan-800 hover:bg-cyan-900/50' : 'bg-cyan-50 text-cyan-800 border border-cyan-200 hover:bg-cyan-100'
          }`}
        >
          🏦 {t('filterBankingKyc', selectedLanguage)}
        </button>

        <button
          onClick={() => setSelectedCategory('utility')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
            selectedCategory === 'utility'
              ? 'bg-emerald-600 text-white border border-emerald-400 shadow-sm'
              : isDark ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800 hover:bg-emerald-900/50' : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
          }`}
        >
          ⚡ {t('filterUtilityBill', selectedLanguage)}
        </button>
      </div>

      {/* VIEW 1: D3 Spatial Map Canvas */}
      {activeViewMode === 'spatial' && (
        <div className="relative" ref={containerRef}>
          <div className={`rounded-xl border overflow-hidden relative ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <svg ref={svgRef} className="w-full h-[480px] block" />

            {/* Map Legend & Selected Region Badge */}
            <div className="absolute top-4 left-4 flex flex-col space-y-2 pointer-events-none">
              <div className={`p-3 rounded-xl border backdrop-blur-md text-xs space-y-1.5 shadow-md pointer-events-auto ${
                isDark ? 'bg-slate-900/90 border-slate-800 text-slate-200' : 'bg-white/90 border-slate-200 text-slate-800'
              }`}>
                <div className="font-extrabold uppercase tracking-wider text-[10px] text-slate-400">Threat Level Legend</div>
                <div className="flex items-center space-x-2 text-[11px]">
                  <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse"></span>
                  <span className="font-bold text-rose-600 dark:text-rose-400">Critical Threat (&gt; 3,000 Incidents)</span>
                </div>
                <div className="flex items-center space-x-2 text-[11px]">
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">High Threat (1,800 - 3,000)</span>
                </div>
                <div className="flex items-center space-x-2 text-[11px]">
                  <span className="w-3 h-3 rounded-full bg-cyan-500"></span>
                  <span className="font-bold text-cyan-600 dark:text-cyan-400">Moderate Threat (&lt; 1,800)</span>
                </div>
              </div>

              {selectedRegion !== 'all' && (
                <div className="bg-cyan-500 text-slate-950 px-3 py-1.5 rounded-xl font-black text-xs shadow-lg flex items-center justify-between pointer-events-auto">
                  <span>FILTERED BY STATE: {selectedRegion.toUpperCase()}</span>
                  <button 
                    onClick={() => setSelectedRegion('all')}
                    className="ml-2 bg-slate-950 text-white px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer"
                  >
                    RESET
                  </button>
                </div>
              )}
            </div>

            {/* Interactive Hover Card Overlay */}
            {hoveredHotspot && (
              <div className={`absolute bottom-4 left-4 right-4 md:right-auto md:max-w-md p-4 rounded-xl border shadow-xl backdrop-blur-md text-xs space-y-2 transition-all ${
                isDark ? 'bg-slate-900/95 border-slate-700 text-slate-100' : 'bg-white/95 border-slate-300 text-slate-900'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    <span className="font-black text-sm">{hoveredHotspot.name}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded font-extrabold text-[10px] ${
                    hoveredHotspot.threatLevel === 'CRITICAL' ? 'bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-500/30' :
                    hoveredHotspot.threatLevel === 'HIGH' ? 'bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30' :
                    'bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30'
                  }`}>
                    {hoveredHotspot.threatLevel}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] py-1 border-y border-slate-700/40">
                  <div>
                    <span className="text-slate-400 block font-semibold">Primary Scam Type:</span>
                    <strong className="text-cyan-600 dark:text-cyan-300">{hoveredHotspot.scamType}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Active Incidents:</span>
                    <strong className="text-rose-600 dark:text-rose-400">{hoveredHotspot.incidentCount.toLocaleString()} ({hoveredHotspot.threatVelocity})</strong>
                  </div>
                </div>

                <p className={`text-[11px] italic font-mono p-2 rounded border ${
                  isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-800'
                }`}>
                  "{hoveredHotspot.topSnippet}"
                </p>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-400 font-bold">Target Persona: {hoveredHotspot.topTargetPersona}</span>
                  <button
                    onClick={() => setSelectedRegion(hoveredHotspot.state)}
                    className="px-2.5 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-[11px] rounded-lg shadow-sm cursor-pointer transition-all"
                  >
                    Filter Radar Feed
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: Scam Type Matrix */}
      {activeViewMode === 'matrix' && (
        <div className="my-4 overflow-x-auto">
          <table className={`w-full text-xs text-left border-collapse rounded-xl overflow-hidden ${
            isDark ? 'bg-slate-950 text-slate-200' : 'bg-slate-50 text-slate-800'
          }`}>
            <thead className={`text-[11px] uppercase font-extrabold tracking-wider border-b ${
              isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-200 border-slate-300 text-slate-700'
            }`}>
              <tr>
                <th className="p-3">State / City Hotspot</th>
                <th className="p-3">Primary Scam Category</th>
                <th className="p-3">Incidents Count</th>
                <th className="p-3">Threat Velocity</th>
                <th className="p-3">Target Persona</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredHotspots.map(hotspot => (
                <tr key={hotspot.id} className={`transition-colors ${
                  isDark ? 'hover:bg-slate-900/60' : 'hover:bg-slate-100'
                }`}>
                  <td className="p-3 font-bold flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                    <span>{hotspot.name}</span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 font-semibold border border-cyan-500/20">
                      {hotspot.scamType}
                    </span>
                  </td>
                  <td className="p-3 font-mono font-bold text-rose-600 dark:text-rose-400">
                    {hotspot.incidentCount.toLocaleString()}
                  </td>
                  <td className="p-3 font-mono text-[11px]">
                    {hotspot.threatVelocity}
                  </td>
                  <td className="p-3 text-slate-400">
                    {hotspot.topTargetPersona}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => setSelectedRegion(hotspot.state)}
                      className="px-2.5 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-[10px] rounded cursor-pointer"
                    >
                      Filter
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* VIEW 3: Leaderboard */}
      {activeViewMode === 'leaderboard' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          {REGIONAL_HOTSPOTS.slice().sort((a,b) => b.incidentCount - a.incidentCount).map((hotspot, idx) => (
            <div 
              key={hotspot.id}
              onClick={() => setSelectedRegion(hotspot.state)}
              className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                isDark ? 'bg-slate-950 border-slate-800 hover:border-cyan-500/50' : 'bg-slate-50 border-slate-200 hover:border-blue-400'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs ${
                  idx === 0 ? 'bg-amber-500 text-slate-950 shadow-md' :
                  idx === 1 ? 'bg-slate-300 text-slate-950' :
                  idx === 2 ? 'bg-amber-700 text-white' :
                  isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600'
                }`}>
                  #{idx + 1}
                </span>
                <div>
                  <h4 className="font-extrabold text-xs">{hotspot.name}</h4>
                  <p className="text-[11px] text-cyan-600 dark:text-cyan-400 font-medium">{hotspot.scamType}</p>
                </div>
              </div>

              <div className="text-right">
                <div className="font-mono font-black text-sm text-rose-600 dark:text-rose-400">
                  {hotspot.incidentCount.toLocaleString()}
                </div>
                <span className="text-[10px] text-slate-400 font-mono">{hotspot.threatVelocity}</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
