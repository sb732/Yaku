import solanaFoundation from '../../assets/images/partners/solana-foundation-text.svg';
import phantom from '../../assets/images/partners/phantom-icon-purple.svg';
import magiceden from '../../assets/images/partners/magic-eden.png';
import opensea from '../../assets/images/partners/opensea-text.svg';
import smb from '../../assets/images/partners/monkedao.png';
import toysRus from '../../assets/images/partners/Toys__R__Us_logo.svg';
import honda from '../../assets/images/partners/Honda-logo.svg';
import unreal from '../../assets/images/partners/Unreal_Engine_Logo.png';
import epic from '../../assets/images/partners/Epic_Games_logo.png';
import immutable from '../../assets/images/partners/immutable-logo-horiz-noreg-WHT-RGB-01.svg';
import justin from '../../assets/images/partners/justin_kan.png';
import fractal from '../../assets/images/partners/fractal.svg';
import { map } from 'lodash';

const PartnerLogos = () => {
    const partners = [
        {
            name: 'Immutable',
            image: immutable,
            style: ''
        },
        {
            name: 'Justin',
            image: justin,
            style: ''
        },
        {
            name: 'Epic',
            image: epic,
            style: ''
        },
        {
            name: 'Solana Foundation',
            image: solanaFoundation,
            style: 'p-2'
        },
        {
            name: 'Honda',
            image: honda,
            style: 'p-2'
        },
        {
            name: "Toy's Rus",
            image: toysRus,
            style: 'p-1'
        },
        {
            name: 'Magic Eden',
            image: magiceden,
            style: 'p-2'
        },
        {
            name: 'Open Sea',
            image: opensea,
            style: 'p-2'
        },
        {
            name: 'Phantom',
            image: phantom,
            style: ''
        },
        {
            name: 'Monke DAO',
            image: smb,
            style: ''
        },
        {
            name: 'Unreal Engine',
            image: unreal,
            style: ''
        },
        {
            name: 'Fractal',
            image: fractal,
            style: 'p-4'
        }
    ];

    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="card p-12 mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:gap-x-10 lg:mx-0 lg:max-w-none">
                {map(partners, ({ name, image, style }: any, idx: number) => (
                    <div key={`partners_${idx}`} className="col-span-2 w-full object-contain lg:col-span-1">
                        <img className={"max-h-14 object-contain w-full " + style} src={image?.src ?? image} alt={name} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PartnerLogos;
