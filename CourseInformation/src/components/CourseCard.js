import React from 'react'
import { Card, Typography } from '@material-ui/core'
import { CardHeader } from '@material-ui/core'
import { CardContent } from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function CourseCard({course}) {
    const history = useHistory()

    return (
        <div>
            <Card elevation={1}>
                <CardHeader 
                    title={course.course_name}
                />
                <CardContent>
                <Typography  variant='body2' color='textSecondary'>
                        教授: {course.teacher}
                    </Typography>
                    <Typography  variant='body2' color='textSecondary'>
                        學系: {course.department}
                    </Typography>
                    <Typography  variant='body2' color='textSecondary'>
                        學分數: {course.credit}
                    </Typography>
                    <Button 
                        variant="outlined" 
                        color="primary" 
                        endIcon={<KeyboardArrowRightIcon/>}
                        onClick={()=>{history.push('/comments/' + course.id)}}  //this.props.history.push({pathname:"/path/" + name});  
                    >
                        查看評論
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

