import { Card, CardContent, CardHeader, CardTitle } from '@app/components/ui/card'
import { Badge } from '@app/components/ui/badge'
import { Progress } from '@radix-ui/react-progress'
import { motion } from 'framer-motion'
import { SkillCardProps } from '../interfaces/ISkills'

export default function SkillCard({ skill, variants }: SkillCardProps) {
    return (
        <motion.div variants={variants.item} whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,191,255,0.2)' }} className="w-full">
            <Card className="h-full bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 overflow-hidden group">
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-xl font-bold text-white">{skill.name}</CardTitle>
                        <Badge variant="outline" className="bg-slate-700/50 text-cyan-400 border-cyan-500/50">
                            {skill.stars}/5
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center gap-4">
                        <div className="text-5xl text-cyan-400 p-3 rounded-full bg-slate-800/50 border border-slate-700">
                            {skill.icon}
                        </div>
                        <Progress value={skill.stars * 20} className="h-2 w-full bg-slate-700">
                            <div style={{ width: `${skill.stars * 20}%` }} className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
                        </Progress>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
