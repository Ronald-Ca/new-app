import { Card, CardContent, CardHeader, CardTitle } from '@app/components/ui/card'
import { Badge } from '@app/components/ui/badge'
import { Progress } from '@radix-ui/react-progress'
import { motion } from 'framer-motion'
import { SkillCardProps } from '../interfaces/ISkills'

export default function SkillCard({ skill, variants }: SkillCardProps) {
    return (
        <motion.div
            variants={variants.item}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(34,211,238,0.18)' }}
            className="w-full"
        >
            <Card className="h-full bg-slate-900/50 border-cyan-500/50 shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 overflow-hidden group">
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                            {skill.name}
                        </CardTitle>
                        <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/50 font-semibold px-3 py-1 text-base">
                            {skill.stars}/5
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center gap-4">
                        <div className="text-6xl text-cyan-400 p-4 rounded-full bg-slate-800/60 border-2 border-cyan-500/30 shadow-cyan-500/10 shadow-lg">
                            {skill.icon}
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <Progress value={skill.stars * 20} className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                                <div style={{ width: `${skill.stars * 20}%` }} className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-500" />
                            </Progress>
                            <div className="flex justify-between text-xs text-cyan-400 px-1 mt-1">
                                <span>Iniciante</span>
                                <span>Avançado</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
