'use client'
import Image from 'next/image';
import * as C from './App.styles';
import logoImagem from '../svgs/b7.svg';
import { InfoItem } from '@/components/InfoItem';

const Page =()=> {
  return (
   <div>
  
    <C.Container>

      <C.Info>
        <C.LogoLink href=''>
          <Image src={logoImagem} width={100} alt='LogoTipo'/>
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem label='Tempo' value='00:00'/>
          <InfoItem label='Movimentos' value='0' />
        </C.InfoArea>
        <button>Reiniciar</button>
      </C.Info>
      <C.GridArea>
...
      </C.GridArea>

    </C.Container>
    
    </div>
  );
}

export default Page;