/**
 * Dashboard Components - htop-style and system monitor dashboards
 * 
 * Various dashboard layouts for terminal UIs:
 * - HtopDashboard: CPU, memory, process monitoring like htop
 * - NetworkDashboard: Network stats and traffic monitoring
 * - ServerDashboard: Server health and metrics
 * - VerticalDashboard: Vertical stacked panels layout
 * - HorizontalDashboard: Horizontal side-by-side layout
 */

import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import { getTheme } from '../../utils/theme';

// ============================================================================
// HTOP-STYLE DASHBOARD
// ============================================================================

interface ProcessInfo {
  pid: number;
  user: string;
  cpu: number;
  mem: number;
  time: string;
  command: string;
}

interface HtopDashboardProps {
  width?: number;
  cpuCores?: number;
  animated?: boolean;
}

export const HtopDashboard: React.FC<HtopDashboardProps> = ({
  width = 80,
  cpuCores = 4,
  animated = true,
}) => {
  const theme = getTheme();
  const [cpuUsages, setCpuUsages] = useState<number[]>(
    Array.from({ length: cpuCores }, () => Math.random() * 100)
  );
  const [memUsage, setMemUsage] = useState(Math.random() * 100);
  const [swapUsage, setSwapUsage] = useState(Math.random() * 50);
  const [processes, setProcesses] = useState<ProcessInfo[]>([
    { pid: 1234, user: 'root', cpu: 12.5, mem: 2.1, time: '0:01.23', command: 'node server.js' },
    { pid: 5678, user: 'user', cpu: 8.3, mem: 1.5, time: '0:00.45', command: 'npm run dev' },
    { pid: 9012, user: 'root', cpu: 5.2, mem: 3.2, time: '0:02.10', command: 'postgres' },
    { pid: 3456, user: 'user', cpu: 2.1, mem: 0.8, time: '0:00.12', command: 'vim index.ts' },
    { pid: 7890, user: 'root', cpu: 1.5, mem: 4.5, time: '0:05.30', command: 'nginx: master' },
  ]);

  useEffect(() => {
    if (!animated) return;
    
    const interval = setInterval(() => {
      setCpuUsages(prev => prev.map(cpu => 
        Math.max(0, Math.min(100, cpu + (Math.random() - 0.5) * 20))
      ));
      setMemUsage(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 10)));
      setSwapUsage(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 5)));
      setProcesses(prev => prev.map(p => ({
        ...p,
        cpu: Math.max(0, Math.min(100, p.cpu + (Math.random() - 0.5) * 5)),
        mem: Math.max(0, Math.min(100, p.mem + (Math.random() - 0.5) * 2)),
      })));
    }, 1000);

    return () => clearInterval(interval);
  }, [animated]);

  const renderBar = (value: number, maxWidth: number, color: string) => {
    const filled = Math.floor((value / 100) * maxWidth);
    const empty = maxWidth - filled;
    return (
      <Box>
        <Text color={color}>{'|'.repeat(filled)}</Text>
        <Text dimColor>{' '.repeat(empty)}</Text>
      </Box>
    );
  };

  const barWidth = Math.floor((width - 20) / 2);

  return (
    <Box flexDirection="column" width={width} borderStyle="single" borderColor={theme.colors.border}>
      {/* Header */}
      <Box justifyContent="center" borderStyle="single" borderColor={theme.colors.primary} paddingX={1}>
        <Text bold color={theme.colors.primary}>HTOP - System Monitor</Text>
      </Box>

      {/* CPU and Memory Section */}
      <Box flexDirection="row" paddingX={1} paddingY={1}>
        {/* CPU Cores */}
        <Box flexDirection="column" width={Math.floor(width / 2)}>
          {cpuUsages.map((usage, i) => (
            <Box key={i}>
              <Text color={theme.colors.secondary}>CPU{i}: </Text>
              {renderBar(usage, barWidth, usage > 80 ? 'red' : usage > 50 ? 'yellow' : 'green')}
              <Text color={theme.colors.text}> {usage.toFixed(1)}%</Text>
            </Box>
          ))}
        </Box>

        {/* Memory */}
        <Box flexDirection="column" width={Math.floor(width / 2)}>
          <Box>
            <Text color={theme.colors.secondary}>Mem: </Text>
            {renderBar(memUsage, barWidth, memUsage > 80 ? 'red' : memUsage > 50 ? 'yellow' : 'cyan')}
            <Text color={theme.colors.text}> {memUsage.toFixed(1)}%</Text>
          </Box>
          <Box>
            <Text color={theme.colors.secondary}>Swp: </Text>
            {renderBar(swapUsage, barWidth, swapUsage > 80 ? 'red' : swapUsage > 50 ? 'yellow' : 'magenta')}
            <Text color={theme.colors.text}> {swapUsage.toFixed(1)}%</Text>
          </Box>
          <Box marginTop={1}>
            <Text dimColor>Tasks: </Text>
            <Text color={theme.colors.success}>{processes.length}</Text>
            <Text dimColor> running</Text>
          </Box>
        </Box>
      </Box>

      {/* Process List Header */}
      <Box borderStyle="single" borderColor={theme.colors.border} paddingX={1}>
        <Text bold color={theme.colors.primary}>
          {'PID'.padEnd(8)}{'USER'.padEnd(10)}{'CPU%'.padEnd(8)}{'MEM%'.padEnd(8)}{'TIME'.padEnd(10)}COMMAND
        </Text>
      </Box>

      {/* Process List */}
      <Box flexDirection="column" paddingX={1}>
        {processes.map((proc, i) => (
          <Box key={proc.pid}>
            <Text color={i === 0 ? theme.colors.primary : theme.colors.text}>
              {String(proc.pid).padEnd(8)}
              {proc.user.padEnd(10)}
              {proc.cpu.toFixed(1).padEnd(8)}
              {proc.mem.toFixed(1).padEnd(8)}
              {proc.time.padEnd(10)}
              {proc.command}
            </Text>
          </Box>
        ))}
      </Box>

      {/* Footer */}
      <Box borderStyle="single" borderColor={theme.colors.border} paddingX={1} justifyContent="space-between">
        <Text dimColor>F1:Help F2:Setup F3:Search F9:Kill F10:Quit</Text>
        <Text color={theme.colors.secondary}>Uptime: 2d 14h 32m</Text>
      </Box>
    </Box>
  );
};

// ============================================================================
// NETWORK DASHBOARD
// ============================================================================

interface NetworkStats {
  interface: string;
  rxBytes: number;
  txBytes: number;
  rxSpeed: number;
  txSpeed: number;
  status: 'up' | 'down';
}

interface NetworkDashboardProps {
  width?: number;
  animated?: boolean;
}

export const NetworkDashboard: React.FC<NetworkDashboardProps> = ({
  width = 70,
  animated = true,
}) => {
  const theme = getTheme();
  const [stats, setStats] = useState<NetworkStats[]>([
    { interface: 'eth0', rxBytes: 1024000, txBytes: 512000, rxSpeed: 125.5, txSpeed: 45.2, status: 'up' },
    { interface: 'wlan0', rxBytes: 2048000, txBytes: 1024000, rxSpeed: 89.3, txSpeed: 32.1, status: 'up' },
    { interface: 'lo', rxBytes: 4096, txBytes: 4096, rxSpeed: 0.1, txSpeed: 0.1, status: 'up' },
  ]);
  const [history, setHistory] = useState<number[]>(Array.from({ length: 20 }, () => Math.random() * 100));

  useEffect(() => {
    if (!animated) return;
    
    const interval = setInterval(() => {
      setStats(prev => prev.map(s => ({
        ...s,
        rxSpeed: Math.max(0, s.rxSpeed + (Math.random() - 0.5) * 20),
        txSpeed: Math.max(0, s.txSpeed + (Math.random() - 0.5) * 10),
        rxBytes: s.rxBytes + Math.floor(Math.random() * 10000),
        txBytes: s.txBytes + Math.floor(Math.random() * 5000),
      })));
      setHistory(prev => [...prev.slice(1), Math.random() * 100]);
    }, 800);

    return () => clearInterval(interval);
  }, [animated]);

  const formatBytes = (bytes: number) => {
    if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${bytes} B`;
  };

  // Simple sparkline
  const renderSparkline = (data: number[], maxWidth: number) => {
    const chars = ['_', '.', '-', '~', '^'];
    return data.slice(-maxWidth).map((v, i) => {
      const idx = Math.min(Math.floor(v / 25), chars.length - 1);
      return <Text key={i} color={theme.colors.primary}>{chars[idx]}</Text>;
    });
  };

  return (
    <Box flexDirection="column" width={width} borderStyle="single" borderColor={theme.colors.border}>
      {/* Header */}
      <Box justifyContent="center" borderStyle="single" borderColor={theme.colors.primary} paddingX={1}>
        <Text bold color={theme.colors.primary}>Network Monitor</Text>
      </Box>

      {/* Traffic Graph */}
      <Box flexDirection="column" paddingX={1} paddingY={1}>
        <Text color={theme.colors.secondary}>Traffic History:</Text>
        <Box>
          <Text dimColor>[</Text>
          {renderSparkline(history, width - 10)}
          <Text dimColor>]</Text>
        </Box>
      </Box>

      {/* Interface Stats */}
      <Box borderStyle="single" borderColor={theme.colors.border} paddingX={1}>
        <Text bold color={theme.colors.primary}>
          {'IFACE'.padEnd(10)}{'STATUS'.padEnd(8)}{'RX'.padEnd(12)}{'TX'.padEnd(12)}{'RX/s'.padEnd(10)}TX/s
        </Text>
      </Box>

      <Box flexDirection="column" paddingX={1}>
        {stats.map(s => (
          <Box key={s.interface}>
            <Text color={theme.colors.text}>{s.interface.padEnd(10)}</Text>
            <Text color={s.status === 'up' ? theme.colors.success : theme.colors.error}>
              {s.status.toUpperCase().padEnd(8)}
            </Text>
            <Text color={theme.colors.text}>{formatBytes(s.rxBytes).padEnd(12)}</Text>
            <Text color={theme.colors.text}>{formatBytes(s.txBytes).padEnd(12)}</Text>
            <Text color={theme.colors.primary}>{`${s.rxSpeed.toFixed(1)} KB`.padEnd(10)}</Text>
            <Text color={theme.colors.secondary}>{`${s.txSpeed.toFixed(1)} KB`}</Text>
          </Box>
        ))}
      </Box>

      {/* Connection Stats */}
      <Box borderStyle="single" borderColor={theme.colors.border} paddingX={1} marginTop={1}>
        <Text dimColor>Connections: </Text>
        <Text color={theme.colors.success}>ESTABLISHED: 24</Text>
        <Text dimColor> | </Text>
        <Text color={theme.colors.warning}>WAIT: 3</Text>
        <Text dimColor> | </Text>
        <Text color={theme.colors.error}>CLOSED: 1</Text>
      </Box>
    </Box>
  );
};

// ============================================================================
// SERVER DASHBOARD
// ============================================================================

interface ServerDashboardProps {
  width?: number;
  animated?: boolean;
}

export const ServerDashboard: React.FC<ServerDashboardProps> = ({
  width = 75,
  animated = true,
}) => {
  const theme = getTheme();
  const [uptime, setUptime] = useState(123456);
  const [requests, setRequests] = useState(45678);
  const [errors, setErrors] = useState(12);
  const [responseTime, setResponseTime] = useState(45);
  const [activeConnections, setActiveConnections] = useState(127);

  useEffect(() => {
    if (!animated) return;
    
    const interval = setInterval(() => {
      setUptime(prev => prev + 1);
      setRequests(prev => prev + Math.floor(Math.random() * 10));
      setErrors(prev => Math.random() > 0.9 ? prev + 1 : prev);
      setResponseTime(prev => Math.max(10, Math.min(200, prev + (Math.random() - 0.5) * 20)));
      setActiveConnections(prev => Math.max(50, Math.min(300, prev + Math.floor((Math.random() - 0.5) * 20))));
    }, 1000);

    return () => clearInterval(interval);
  }, [animated]);

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${days}d ${hours}h ${mins}m`;
  };

  const getStatusColor = (value: number, thresholds: [number, number]) => {
    if (value < thresholds[0]) return theme.colors.success;
    if (value < thresholds[1]) return theme.colors.warning;
    return theme.colors.error;
  };

  return (
    <Box flexDirection="column" width={width} borderStyle="double" borderColor={theme.colors.border}>
      {/* Header */}
      <Box justifyContent="center" borderStyle="single" borderColor={theme.colors.primary} paddingX={1}>
        <Text bold color={theme.colors.primary}>Server Status Dashboard</Text>
      </Box>

      {/* Status Grid */}
      <Box flexDirection="row" paddingX={1} paddingY={1}>
        {/* Left Column */}
        <Box flexDirection="column" width={Math.floor(width / 2)} paddingRight={2}>
          <Box borderStyle="round" borderColor={theme.colors.success} paddingX={2} paddingY={1} marginBottom={1}>
            <Box flexDirection="column">
              <Text dimColor>Status</Text>
              <Text bold color={theme.colors.success}>ONLINE</Text>
            </Box>
          </Box>
          
          <Box borderStyle="round" borderColor={theme.colors.border} paddingX={2} paddingY={1} marginBottom={1}>
            <Box flexDirection="column">
              <Text dimColor>Uptime</Text>
              <Text bold color={theme.colors.primary}>{formatUptime(uptime)}</Text>
            </Box>
          </Box>

          <Box borderStyle="round" borderColor={theme.colors.border} paddingX={2} paddingY={1}>
            <Box flexDirection="column">
              <Text dimColor>Total Requests</Text>
              <Text bold color={theme.colors.text}>{requests.toLocaleString()}</Text>
            </Box>
          </Box>
        </Box>

        {/* Right Column */}
        <Box flexDirection="column" width={Math.floor(width / 2)}>
          <Box borderStyle="round" borderColor={getStatusColor(responseTime, [50, 100])} paddingX={2} paddingY={1} marginBottom={1}>
            <Box flexDirection="column">
              <Text dimColor>Response Time</Text>
              <Text bold color={getStatusColor(responseTime, [50, 100])}>{responseTime.toFixed(0)}ms</Text>
            </Box>
          </Box>

          <Box borderStyle="round" borderColor={theme.colors.border} paddingX={2} paddingY={1} marginBottom={1}>
            <Box flexDirection="column">
              <Text dimColor>Active Connections</Text>
              <Text bold color={theme.colors.secondary}>{activeConnections}</Text>
            </Box>
          </Box>

          <Box borderStyle="round" borderColor={errors > 20 ? theme.colors.error : theme.colors.border} paddingX={2} paddingY={1}>
            <Box flexDirection="column">
              <Text dimColor>Errors (24h)</Text>
              <Text bold color={errors > 20 ? theme.colors.error : theme.colors.warning}>{errors}</Text>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box borderStyle="single" borderColor={theme.colors.border} paddingX={1}>
        <Text dimColor>Last updated: </Text>
        <Text color={theme.colors.text}>{new Date().toLocaleTimeString()}</Text>
      </Box>
    </Box>
  );
};

// ============================================================================
// VERTICAL STACKED DASHBOARD
// ============================================================================

interface VerticalDashboardProps {
  width?: number;
  animated?: boolean;
}

export const VerticalDashboard: React.FC<VerticalDashboardProps> = ({
  width = 50,
  animated = true,
}) => {
  const theme = getTheme();
  const [cpu, setCpu] = useState(45);
  const [memory, setMemory] = useState(62);
  const [disk, setDisk] = useState(78);
  const [network, setNetwork] = useState(23);

  useEffect(() => {
    if (!animated) return;
    
    const interval = setInterval(() => {
      setCpu(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 15)));
      setMemory(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 8)));
      setDisk(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 2)));
      setNetwork(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 20)));
    }, 1000);

    return () => clearInterval(interval);
  }, [animated]);

  const renderVerticalBar = (value: number, label: string, color: string) => {
    const height = 8;
    const filled = Math.floor((value / 100) * height);
    
    return (
      <Box flexDirection="column" alignItems="center" marginX={1}>
        <Text dimColor>{value.toFixed(0)}%</Text>
        <Box flexDirection="column">
          {Array.from({ length: height }).map((_, i) => {
            const isFilled = i >= (height - filled);
            return (
              <Text key={i} color={isFilled ? color : theme.colors.border}>
                {isFilled ? '[]' : '..'}
              </Text>
            );
          })}
        </Box>
        <Text color={color} bold>{label}</Text>
      </Box>
    );
  };

  return (
    <Box flexDirection="column" width={width} borderStyle="single" borderColor={theme.colors.border}>
      {/* Header */}
      <Box justifyContent="center" borderStyle="single" borderColor={theme.colors.primary} paddingX={1}>
        <Text bold color={theme.colors.primary}>Vertical Metrics</Text>
      </Box>

      {/* Vertical Bars */}
      <Box justifyContent="center" paddingY={1}>
        {renderVerticalBar(cpu, 'CPU', cpu > 80 ? 'red' : cpu > 50 ? 'yellow' : 'green')}
        {renderVerticalBar(memory, 'MEM', memory > 80 ? 'red' : memory > 50 ? 'yellow' : 'cyan')}
        {renderVerticalBar(disk, 'DISK', disk > 90 ? 'red' : disk > 70 ? 'yellow' : 'blue')}
        {renderVerticalBar(network, 'NET', 'magenta')}
      </Box>

      {/* Summary */}
      <Box borderStyle="single" borderColor={theme.colors.border} paddingX={1} justifyContent="center">
        <Text dimColor>System Health: </Text>
        <Text color={cpu < 80 && memory < 80 ? theme.colors.success : theme.colors.warning} bold>
          {cpu < 80 && memory < 80 ? 'GOOD' : 'WARNING'}
        </Text>
      </Box>
    </Box>
  );
};

// ============================================================================
// HORIZONTAL PANELS DASHBOARD
// ============================================================================

interface HorizontalDashboardProps {
  width?: number;
  animated?: boolean;
}

export const HorizontalDashboard: React.FC<HorizontalDashboardProps> = ({
  width = 90,
  animated = true,
}) => {
  const theme = getTheme();
  const [services, setServices] = useState([
    { name: 'API', status: 'running', latency: 45 },
    { name: 'Database', status: 'running', latency: 12 },
    { name: 'Cache', status: 'running', latency: 3 },
    { name: 'Queue', status: 'warning', latency: 89 },
  ]);

  useEffect(() => {
    if (!animated) return;
    
    const interval = setInterval(() => {
      setServices(prev => prev.map(s => ({
        ...s,
        latency: Math.max(1, s.latency + Math.floor((Math.random() - 0.5) * 10)),
        status: Math.random() > 0.95 ? (Math.random() > 0.5 ? 'warning' : 'running') : s.status,
      })));
    }, 1500);

    return () => clearInterval(interval);
  }, [animated]);

  const panelWidth = Math.floor((width - 10) / 4);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return { icon: '[OK]', color: theme.colors.success };
      case 'warning': return { icon: '[!!]', color: theme.colors.warning };
      case 'error': return { icon: '[XX]', color: theme.colors.error };
      default: return { icon: '[??]', color: theme.colors.dimText };
    }
  };

  return (
    <Box flexDirection="column" width={width} borderStyle="single" borderColor={theme.colors.border}>
      {/* Header */}
      <Box justifyContent="center" borderStyle="single" borderColor={theme.colors.primary} paddingX={1}>
        <Text bold color={theme.colors.primary}>Service Status - Horizontal View</Text>
      </Box>

      {/* Horizontal Panels */}
      <Box flexDirection="row" paddingX={1} paddingY={1} justifyContent="space-between">
        {services.map(service => {
          const statusInfo = getStatusIcon(service.status);
          return (
            <Box
              key={service.name}
              flexDirection="column"
              width={panelWidth}
              borderStyle="round"
              borderColor={statusInfo.color}
              paddingX={1}
              paddingY={1}
              alignItems="center"
            >
              <Text bold color={theme.colors.text}>{service.name}</Text>
              <Text color={statusInfo.color}>{statusInfo.icon}</Text>
              <Text dimColor>{service.latency}ms</Text>
            </Box>
          );
        })}
      </Box>

      {/* Summary Row */}
      <Box borderStyle="single" borderColor={theme.colors.border} paddingX={1} justifyContent="space-between">
        <Box>
          <Text dimColor>Services: </Text>
          <Text color={theme.colors.success}>{services.filter(s => s.status === 'running').length} OK</Text>
          <Text dimColor> | </Text>
          <Text color={theme.colors.warning}>{services.filter(s => s.status === 'warning').length} WARN</Text>
        </Box>
        <Text dimColor>Avg Latency: {Math.round(services.reduce((a, s) => a + s.latency, 0) / services.length)}ms</Text>
      </Box>
    </Box>
  );
};

// ============================================================================
// PAGED/FLIPBOOK DASHBOARD
// ============================================================================

interface PagedDashboardProps {
  width?: number;
  animated?: boolean;
}

export const PagedDashboard: React.FC<PagedDashboardProps> = ({
  width = 60,
  animated = true,
}) => {
  const theme = getTheme();
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 3;

  useEffect(() => {
    if (!animated) return;
    
    const interval = setInterval(() => {
      setCurrentPage(prev => (prev + 1) % totalPages);
    }, 3000);

    return () => clearInterval(interval);
  }, [animated]);

  const pages = [
    // Page 1: Overview
    <Box key="overview" flexDirection="column" paddingX={2} paddingY={1}>
      <Text bold color={theme.colors.primary}>System Overview</Text>
      <Box marginTop={1}>
        <Text dimColor>CPU: </Text>
        <Text color={theme.colors.success}>45%</Text>
        <Text dimColor> | Memory: </Text>
        <Text color={theme.colors.warning}>72%</Text>
      </Box>
      <Box>
        <Text dimColor>Disk: </Text>
        <Text color={theme.colors.text}>256GB / 512GB</Text>
      </Box>
      <Box>
        <Text dimColor>Load Average: </Text>
        <Text color={theme.colors.text}>1.25 1.10 0.95</Text>
      </Box>
    </Box>,

    // Page 2: Processes
    <Box key="processes" flexDirection="column" paddingX={2} paddingY={1}>
      <Text bold color={theme.colors.primary}>Top Processes</Text>
      <Box flexDirection="column" marginTop={1}>
        <Text color={theme.colors.text}>1. node       12.5%</Text>
        <Text color={theme.colors.text}>2. postgres    8.3%</Text>
        <Text color={theme.colors.text}>3. nginx       5.2%</Text>
        <Text color={theme.colors.text}>4. redis       2.1%</Text>
      </Box>
    </Box>,

    // Page 3: Network
    <Box key="network" flexDirection="column" paddingX={2} paddingY={1}>
      <Text bold color={theme.colors.primary}>Network Stats</Text>
      <Box marginTop={1}>
        <Text dimColor>In: </Text>
        <Text color={theme.colors.success}>125.5 KB/s</Text>
      </Box>
      <Box>
        <Text dimColor>Out: </Text>
        <Text color={theme.colors.secondary}>45.2 KB/s</Text>
      </Box>
      <Box>
        <Text dimColor>Connections: </Text>
        <Text color={theme.colors.text}>127 active</Text>
      </Box>
    </Box>,
  ];

  return (
    <Box flexDirection="column" width={width} borderStyle="single" borderColor={theme.colors.border}>
      {/* Header with page indicator */}
      <Box justifyContent="space-between" borderStyle="single" borderColor={theme.colors.primary} paddingX={1}>
        <Text bold color={theme.colors.primary}>Paged Dashboard</Text>
        <Box>
          {Array.from({ length: totalPages }).map((_, i) => (
            <Text key={i} color={i === currentPage ? theme.colors.primary : theme.colors.dimText}>
              {i === currentPage ? ' [*] ' : ' [ ] '}
            </Text>
          ))}
        </Box>
      </Box>

      {/* Current Page Content */}
      <Box minHeight={6}>
        {pages[currentPage]}
      </Box>

      {/* Footer */}
      <Box borderStyle="single" borderColor={theme.colors.border} paddingX={1} justifyContent="center">
        <Text dimColor>Page {currentPage + 1} of {totalPages} - Auto-rotating</Text>
      </Box>
    </Box>
  );
};

// Preview components for registry
export const HtopDashboardPreview: React.FC = () => <HtopDashboard width={50} cpuCores={2} animated={false} />;
export const NetworkDashboardPreview: React.FC = () => <NetworkDashboard width={45} animated={false} />;
export const ServerDashboardPreview: React.FC = () => <ServerDashboard width={45} animated={false} />;
export const VerticalDashboardPreview: React.FC = () => <VerticalDashboard width={35} animated={false} />;
export const HorizontalDashboardPreview: React.FC = () => <HorizontalDashboard width={50} animated={false} />;
export const PagedDashboardPreview: React.FC = () => <PagedDashboard width={40} animated={false} />;
