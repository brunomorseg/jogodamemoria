import * as C from '@/components/GridItem/styles'
import { GridItemType } from '@/types/GridItemType';
import b7vsg from '../../svgs/b7.svg'
import Image from 'next/image';
import {items} from '../../data/items'

type Props = {
    item:GridItemType;
   
    onClick:()=>void;
}

export const GridItem = ({item,onClick}:Props)=> {
    return(
        <C.Container 
        showBackground= {item.permanentShow || item.show}
        onClick={onClick}>

          {item.permanentShow===false && item.show ===false && <Image src={b7vsg} width={40} height={40} alt='Alternativa'/>}

          {(item.permanentShow || item.show) && item.item !== null && <Image  src={items[item.item].icon} alt='a'  />}

        </C.Container>
    )
}