import * as C from './styles';
import Image from 'next/image';

type Props = {
    
    label:string;
    icon: string;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

export const Button = ({label,icon, onClick}:Props) => {
    return(
        <C.Container onClick={onClick}>
            
            {icon && <C.IconArea>
           <Image src={icon} alt='alternativa' height={20}/>
            </C.IconArea>}  
            
            <C.Label>{label}</C.Label>
        </C.Container>
    )
}