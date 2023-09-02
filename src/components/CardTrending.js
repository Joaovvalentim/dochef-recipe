import React from 'react'
import './CardTrending.css';

function CardTrending() {
    return (
        <>
            <div className="slide-container">
                <div className="slide-content">
                    <div className="card-wrapper">
                        <div className="card ">
                            <div className="image-content">
                                <span className="overlay"></span>
                                <div className="card-image">
                                    <img src="https://img.freepik.com/fotos-gratis/imagem-aproximada-da-cabeca-de-um-lindo-leao_181624-35855.jpg?w=2000" alt="" className="card-img" />
                                </div>
                            </div>
                            <div className="card-content">
                                <h2 className="name">Lion</h2>
                                <p className="description"> Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker.</p>
                                <button type="button" className='button'>View More</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardTrending