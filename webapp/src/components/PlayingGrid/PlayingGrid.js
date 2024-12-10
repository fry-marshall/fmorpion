import './PlayingGrid.css';
import Symbol1 from '../Symbol1/Symbol1'
import Symbol2 from '../Symbol2/Symbol2'

export default function PlayingGrid(){
    return <div className="player-grid">
        <GridItem>
            <Symbol1 />
        </GridItem>
        <GridItem>
            <Symbol2 />
        </GridItem>
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
    </div>
}

function GridItem({children}){
    return <div className='grid-item'>
        {children}
    </div>
}