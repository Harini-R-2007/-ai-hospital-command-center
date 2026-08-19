import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  FileSpreadsheet, 
  CheckCircle2, 
  Sparkles, 
  Calendar,
  Building2
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { mockDepartments, mockInventory, mockPredictionFactors } from '../data/mockData';

interface ReportsViewProps {
  darkMode: boolean;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ darkMode }) => {
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);

  const reportTypes = [
    { id: 'daily', name: 'Daily Operations Executive Summary', desc: 'KPI snapshot, patient flow, bed occupancy, and active triage status.' },
    { id: 'weekly', name: 'Weekly Resource Demand Analysis', desc: '7-day trend breakdown, department occupancy averages, and inventory burn.' },
    { id: 'monthly', name: 'Monthly Operational Benchmark', desc: 'Long-term admission patterns, staff utilization, and budget audit.' },
    { id: 'emergency', name: 'Emergency Command Audit Log', desc: 'Code Red protocol events, triage logs, and surge bed allocation.' },
    { id: 'prediction', name: 'AI Machine Learning Accuracy Report', desc: 'Forecast precision, SHAP feature importance, and model confidence logs.' },
  ];

  const handleDownloadPDF = (reportName: string) => {
    setDownloadingFormat(`pdf-${reportName}`);
    
    setTimeout(() => {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("AI HOSPITAL COMMAND CENTER", 14, 20);
      doc.setFontSize(12);
      doc.text(`Official Executive Report: ${reportName}`, 14, 30);
      doc.setFontSize(10);
      doc.text(`Generated Date: ${new Date().toLocaleString()}`, 14, 38);
      doc.text(`Hospital Risk Level: ELEVATED (75.7% Occupancy)`, 14, 44);
      doc.text(`AI Prediction Confidence: 94.2%`, 14, 50);

      doc.line(14, 55, 196, 55);

      doc.setFontSize(12);
      doc.text("Department Occupancy Telemetry:", 14, 65);
      let y = 73;
      mockDepartments.forEach((d) => {
        doc.setFontSize(10);
        doc.text(`${d.name} (${d.code}): ${d.occupiedBeds}/${d.totalBeds} beds occupied (${Math.round((d.occupiedBeds/d.totalBeds)*100)}%)`, 14, y);
        y += 7;
      });

      y += 5;
      doc.setFontSize(12);
      doc.text("Explainable AI Causal Factors:", 14, y);
      y += 8;
      mockPredictionFactors.slice(0, 4).forEach((f) => {
        doc.setFontSize(10);
        doc.text(`• ${f.factor}: ${f.impactValue > 0 ? '+' : ''}${f.impactValue} Patients (${f.confidence}% confidence)`, 14, y);
        y += 7;
      });

      doc.save(`${reportName.toLowerCase().replace(/\s+/g, '_')}_report.pdf`);
      setDownloadingFormat(null);
    }, 600);
  };

  const handleDownloadExcel = (reportName: string) => {
    setDownloadingFormat(`excel-${reportName}`);

    setTimeout(() => {
      const data = mockDepartments.map((d) => ({
        Department: d.name,
        Code: d.code,
        Floor: d.floor,
        TotalBeds: d.totalBeds,
        OccupiedBeds: d.occupiedBeds,
        OccupancyPct: `${Math.round((d.occupiedBeds / d.totalBeds) * 100)}%`,
        ICUBeds: `${d.icuOccupied}/${d.icuTotal}`,
        ActiveDoctors: d.doctorsCount,
        ActiveNurses: d.nursesCount,
        Status: d.status.toUpperCase()
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Department Stats");

      XLSX.writeFile(workbook, `${reportName.toLowerCase().replace(/\s+/g, '_')}_data.xlsx`);
      setDownloadingFormat(null);
    }, 600);
  };

  return (
    <div className="space-y-6 pb-8">
      
      {/* Header */}
      <div className={`p-6 rounded-2xl border transition-all ${
        darkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Compliance & Governance
              </span>
              <span className="text-xs text-slate-400">NABH & HIPAA Compliant Export</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight font-display flex items-center gap-2">
              <FileText className="w-7 h-7 text-purple-400" />
              Automated Hospital Executive Reports
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Generate and download enterprise PDF or Excel reports for executive board meetings, hospital accreditation, and emergency audits.
            </p>
          </div>
        </div>
      </div>

      {/* Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reportTypes.map((rep) => (
          <div
            key={rep.id}
            className={`p-5 rounded-2xl border transition-all duration-200 ${
              darkMode ? 'bg-slate-800/80 border-slate-700 hover:border-slate-600' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold uppercase text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                EXECUTIVE REPORT
              </span>
              <span className="text-xs text-slate-400">Updated Today</span>
            </div>

            <h3 className="text-base font-bold text-slate-100 dark:text-slate-100 mb-1">
              {rep.name}
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {rep.desc}
            </p>

            <div className="pt-3 border-t border-slate-700/40 flex items-center justify-end gap-2">
              <button
                onClick={() => handleDownloadPDF(rep.name)}
                disabled={downloadingFormat === `pdf-${rep.name}`}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-1.5 transition-all shadow-md shadow-purple-600/20"
              >
                <Download className="w-3.5 h-3.5" /> PDF Export
              </button>
              <button
                onClick={() => handleDownloadExcel(rep.name)}
                disabled={downloadingFormat === `excel-${rep.name}`}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/20"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" /> Excel (.xlsx)
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
