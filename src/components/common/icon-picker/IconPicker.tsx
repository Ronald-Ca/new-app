import React, { useState } from 'react';
import * as faIcons from 'react-icons/fa';
import * as ioIcons from 'react-icons/io5';
import * as siIcons from 'react-icons/si';
import * as diIcons from 'react-icons/di';
import * as bsIcons from 'react-icons/bs';
import * as riIcons from 'react-icons/ri';
import * as mdIcons from 'react-icons/md';
import * as aiIcons from 'react-icons/ai';
import * as biIcons from 'react-icons/bi';
import * as ciIcons from 'react-icons/ci';
import * as cgIcons from 'react-icons/cg';
import * as fiIcons from 'react-icons/fi';
import * as fcIcons from 'react-icons/fc';
import * as fa6Icons from 'react-icons/fa6';
import * as giIcons from 'react-icons/gi';
import * as goIcons from 'react-icons/go';
import * as grIcons from 'react-icons/gr';
import * as hiIcons from 'react-icons/hi';
import * as hi2Icons from 'react-icons/hi2';
import * as imIcons from 'react-icons/im';
import * as liaIcons from 'react-icons/lia';
import * as io5Icons from 'react-icons/io5';
import * as luIcons from 'react-icons/lu';
import * as piIcons from 'react-icons/pi';
import * as rxIcons from 'react-icons/rx';
import * as slIcons from 'react-icons/sl';
import * as tbIcons from 'react-icons/tb';
import * as tfiIcons from 'react-icons/tfi';
import * as tiIcons from 'react-icons/ti';
import * as vscIcons from 'react-icons/vsc';
import * as wiIcons from 'react-icons/wi';

const iconLibs = [
  { key: 'fa', label: 'FontAwesome', icons: faIcons },
  { key: 'io', label: 'IonIcons', icons: ioIcons },
  { key: 'si', label: 'SimpleIcons', icons: siIcons },
  { key: 'di', label: 'DevIcons', icons: diIcons },
  { key: 'bs', label: 'Bootstrap', icons: bsIcons },
  { key: 'ri', label: 'RemixIcon', icons: riIcons },
  { key: 'md', label: 'Material', icons: mdIcons },
  { key: 'ai', label: 'AntDesign', icons: aiIcons },
  { key: 'bi', label: 'BoxIcons', icons: biIcons },
  { key: 'ci', label: 'Circum', icons: ciIcons },
  { key: 'cg', label: 'CSSGG', icons: cgIcons },
  { key: 'fi', label: 'Feather', icons: fiIcons },
  { key: 'fc', label: 'FlatColor', icons: fcIcons },
  { key: 'fa6', label: 'FontAwesome6', icons: fa6Icons },
  { key: 'gi', label: 'GameIcons', icons: giIcons },
  { key: 'go', label: 'GithubOcticons', icons: goIcons },
  { key: 'gr', label: 'Grommet', icons: grIcons },
  { key: 'hi', label: 'HeroIcons', icons: hiIcons },
  { key: 'hi2', label: 'HeroIcons2', icons: hi2Icons },
  { key: 'im', label: 'IcoMoon', icons: imIcons },
  { key: 'lia', label: 'LineAwesome', icons: liaIcons },
  { key: 'io5', label: 'IonIcons5', icons: io5Icons },
  { key: 'lu', label: 'Lucide', icons: luIcons },
  { key: 'pi', label: 'Phosphor', icons: piIcons },
  { key: 'rx', label: 'Radix', icons: rxIcons },
  { key: 'sl', label: 'SimpleLine', icons: slIcons },
  { key: 'tb', label: 'Tabler', icons: tbIcons },
  { key: 'tfi', label: 'Themify', icons: tfiIcons },
  { key: 'ti', label: 'TypIcons', icons: tiIcons },
  { key: 'vsc', label: 'VSCode', icons: vscIcons },
  { key: 'wi', label: 'Weather', icons: wiIcons },
];

interface IconPickerProps {
  onSelect: (iconName: string) => void;
  size?: number;
  color?: string;
  libsToShow?: string[];
}

export const IconPicker: React.FC<IconPickerProps> = ({ onSelect, size = 24, color = '#0ea5e9', libsToShow }) => {
  const libs = libsToShow
    ? iconLibs.filter(lib => libsToShow.includes(lib.key))
    : iconLibs;
  const [activeLib, setActiveLib] = useState(libs[0].key);
  const [search, setSearch] = useState('');
  const icons = libs.find(lib => lib.key === activeLib)?.icons || {};

  // Filtrar ícones pelo termo de busca
  const filteredIcons = Object.entries(icons).filter(([iconName]) =>
    iconName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full">
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Pesquisar ícone..."
        className="mb-2 w-full px-2 py-1 rounded border border-slate-700 bg-slate-900 text-cyan-400 focus:outline-none focus:border-cyan-500 text-sm"
      />
      <div className="flex gap-2 mb-2 flex-wrap">
        {libs.map(lib => (
          <button
            key={lib.key}
            className={`px-2 py-1 rounded text-xs font-medium border ${activeLib === lib.key ? 'bg-cyan-500 text-white border-cyan-500' : 'bg-slate-800 text-cyan-400 border-slate-700'} transition`}
            onClick={() => setActiveLib(lib.key)}
            type="button"
          >
            {lib.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-8 gap-2 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-400 scrollbar-track-transparent scrollbar-thumb-rounded-lg p-1 bg-slate-900 rounded">
        {filteredIcons.length === 0 && (
          <div className="col-span-8 text-center text-xs text-gray-400 py-4">Nenhum ícone encontrado.</div>
        )}
        {filteredIcons.map(([iconName, IconRaw]) => {
          const Icon = IconRaw as React.ComponentType<any>;
          return (
            <button
              key={iconName}
              className="flex items-center justify-center p-1 rounded hover:bg-cyan-500/20 focus:bg-cyan-500/30"
              title={iconName}
              type="button"
              onClick={() => onSelect(iconName)}
            >
              <Icon size={size} color={color} />
            </button>
          );
        })}
      </div>
    </div>
  );
}; 