import { Card, CardHeader, CardContent } from '@app/components/ui/card'
import { BiSolidInstitution } from 'react-icons/bi'
import { FaCity, FaChalkboardTeacher, FaCalendarAlt } from 'react-icons/fa'
import React from 'react'
import { EducationType } from '@app/services/education-service'

interface EducationProps {
  education: EducationType[];
}

export const Education: React.FC<EducationProps> = ({ education }) => (
  <Card className="bg-slate-900/50 border-cyan-500/50 text-white">
    <CardHeader>
      <h2 className="text-3xl font-bold text-center text-cyan-400">Formação Acadêmica</h2>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 gap-6">
        {education?.map((edu, key) => (
          <div key={key} className="bg-slate-800/50 rounded-xl p-6 border-l-4 border-cyan-500">
            <h3 className="text-xl font-bold text-white mb-4">{edu.course}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-gray-300">
                <BiSolidInstitution className="text-cyan-400" />
                <span>{edu.institution}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <FaCity className="text-cyan-400" />
                <span>
                  {edu.city} - {edu.state}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <FaChalkboardTeacher className="text-cyan-400" />
                <span>{edu.modality === "on-site" ? "Presencial" : "Home Office"}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <FaCalendarAlt className="text-cyan-400" />
                <span>
                  {edu.yearInit} - {edu.yearFinal}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)
