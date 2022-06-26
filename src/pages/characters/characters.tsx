import React from "react";
import IceandfireApi from "../../services/characters-list";
import { Character } from "../../types/characters";
import "./characters.css";
import Card from 'react-bootstrap/Card'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Modal from '../modal'
import 'bootstrap/dist/css/bootstrap.min.css'

type TProps = any;
type TState = {
  characters: [] | Character[];
  isLoading: boolean;
  isError: boolean;
  page: number;
  pageSize: number;
  modal: boolean;
  modalObj: {};
};
export default class Characters extends React.Component<TProps, TState> {
  state = {
    characters: [],
    isLoading: false,
    isError: false,
    page: 1,
    pageSize: 3,
    modal: false,
    modalObj: []
  };

  getCharacters = () => {
    const { page, pageSize } = this.state;
    this.setState({ isLoading: true });
    IceandfireApi.getCharacters(page, pageSize)
      .then((res: Character[]) => {
        this.setState({ characters: res, isLoading: false });
      })
      .catch((e: any) => {
        this.setState({ isLoading: false, isError: true });
      });
  };
  componentDidMount() {
    this.getCharacters();
  }
  handlerPage = (type: "left" | "right") => {
    if (type === "left" && this.state.page > 1) {
      this.setState({ page: this.state.page - 1 });
    } else {
      this.setState({ page: this.state.page + 1 });
    }
    this.getCharacters();
  }
  render() {
    const { characters, isLoading, isError, modal, modalObj } = this.state;
    return (  
        <div>
        <Card className="card-m" style={{ width: '80%' }}>
            <Card.Body>
            <Card.Title>Game of Trones Characters</Card.Title>
            <ListGroup variant="flush">
                {isError && "Error"}
                {isLoading && "Loading"}
                {characters &&
                !isError &&
                !isLoading &&
                this.state.characters.map((el: Character) => (
                    <ListGroup.Item className="character-item" key={el.url}>
                    <Modal elem={el}/>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <ButtonGroup aria-label="Basic example">
                <Button
                disabled={this.state.page === 1}
                onClick={(_e: any) => this.handlerPage("left")} 
                variant="secondary">Prev.</Button>
                <Button
                disabled={this.state.page === 5}
                onClick={(_e: any) => this.handlerPage("right")}
                variant="secondary">Next</Button>
            </ButtonGroup>
            </Card.Body>
        </Card>
        
        {/* {modal && <div>
                    <div>name: {modalObj.name || modalObj.aliases[0]}</div>
                    <div>Culture: {modalObj.culture || "unknown"}</div>
                    <div>gender: {modalObj.gender || "unknown"}</div>
                    <div>titles: {modalObj.titles[0] || "unknown"}</div>
                    <div>TV Series: {modalObj.tvSeries.map((item: any) => (`${item} `))}</div>
                </div>
        } */}
        {/* <div>
            {isError && "Error"}
            {isLoading && "Loading"}
            {characters &&
            !isError &&
            !isLoading &&
            this.state.characters.map((el: Character) => (
                <div key={el.url}
                onClick={(this.showCharacterCard(el.url))}
                >
                {el.name || el.aliases[0]} {el.culture}
                </div>
            ))}
            {characters && !isError && (
            <div className="books-nav">
                <button
                disabled={this.state.page === 1}
                onClick={(_e: any) => this.handlerPage("left")}
                >
                left
                </button>
                <button onClick={(_e: any) => this.handlerPage("right")}>
                right
                </button>
            </div>
            )}
        </div> */}
        </div>
    );
  }
}