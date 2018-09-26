import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', () => {
    class CatRow extends React.Component {
        render() {
            var name = this.props.kitty.likesKids ?
                this.props.kitty.name : <span style={{color: 'red'}}> {this.props.kitty.name} </span>;
            return <tr>
                <td>{name}</td>
                <td>{this.props.kitty.age}</td>
            </tr>;
        }
    }

    class CatCategoryRow extends React.Component {
        render() {
            return <tr>
                <th colSpan="2">{this.props.category}</th>
            </tr>;
        }
    }

    class CatTable extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                likesKids: this.props.likesKids,
            }
        }
        render() {
            var rows = [];
            var lastCategory = null;
            var allCats= this.props.kitties;
            var niceCats = [];
            var catList= [];

            allCats.forEach(el => {
               if (el.likesKids === true) {
                   niceCats.push(el);
               }
            });
            {this.props.likesKids ? catList = niceCats : catList=allCats}

            catList.forEach((kitty) => {
                if (kitty.category !== lastCategory) {
                    rows.push(<CatCategoryRow category= { kitty.category }  key= { kitty.category } />);
                }
                if (kitty.name.toLowerCase().indexOf(this.props.fillerText.toLowerCase()) > -1){
                    rows.push(<CatRow kitty={kitty} key={kitty.name} />);
                }
                lastCategory = kitty.category;
            });
            return <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>;
        }
    }

    class SearchBar extends React.Component {
        handleText = (event) => {
            if (typeof this.props.ifTextChange === 'function') {
                this.props.ifTextChange(event.target.value);
            }
        };
        handleCheckbox = (event) => {
            if (typeof this.props.ifCheckboxChange === 'function') {
                this.props.ifCheckboxChange(event.target.checked);
            }
        };


        render() {
            return <form><input type="text"
                                value={this.props.filterText}
                                onChange={this.handleText} placeholder="Search..."/><p>
                <input type="checkbox"
                       value={this.props.likesKids}
                       onChange={this.handleCheckbox}/> Only show kitties that likes kids</p>
            </form>;
        }
    }

    class App extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                filterText: '',
                likesKids: false,
            }
        }
        typeFunct = (txt) => {
            this.setState({
                filterText: txt,
            });
        };
        clickFunct = (val) => {
            this.setState({
                likesKids: val,
            });
        };

        render() {
            return <div>
                <SearchBar fillerText={this.state.filterText}
                           likesKids={this.state.likesKids}
                           ifTextChange={this.typeFunct}
                           ifCheckboxChange={this.clickFunct}/>
                <CatTable kitties={this.props.kitties}
                          fillerText={this.state.filterText}
                          likesKids={this.state.likesKids}/>
            </div>;
        }
    }

    var kitties = [
        {category: "male", age: "4", likesKids: true, name: "Fidel Catstro"},
        {category: "male", age: "9", likesKids: true, name: "Hairy Potter"},
        {category: "male", age: "2", likesKids: false, name: "Grumpy"},
        {category: "female", age: "1", likesKids: true, name: "Jude Paw"},
        {category: "female", age: "2", likesKids: false, name: "Lucifurr"},
        {category: "female", age: "3", likesKids: true, name: "Meowly Cyrus"}
    ];

    ReactDOM.render(
        <App kitties={kitties}/>,
        document.getElementById('app')
    );

});