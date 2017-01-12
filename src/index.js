const url = "https://fcctop100.herokuapp.com/api/fccusers/top/alltime";
const url2 = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
const app = document.getElementById("app");
const ourRequest = new XMLHttpRequest();
ourRequest.open('GET',url);
var json1;
var json2;
ourRequest.onload = function(){
    var data = ourRequest.responseText;
    json1 = JSON.parse(data);
    ReactDOM.render(<Applet json1={json1} json2={json2} />, app);
}
ourRequest.send();

const ourRequest2 = new XMLHttpRequest();
ourRequest2.open('GET',url2);
ourRequest2.onload = function(){
    var data = ourRequest2.responseText;
    json2 = JSON.parse(data);
    //console.log(json1);
    ReactDOM.render(<Applet json1={json1} json2={json2} />, app);
}
ourRequest2.send();

////         AJAX                  ////
///////////////////////////////////////
////         React                 ////

class Recent extends React.Component {
    handleClick(){
        this.props.leader.reverse();
        this.props.changeLeaders(0);
    }

    handleRecentClick(){
        this.props.leader.reverse();
        this.props.changeLeaders(1);
    }

    render(){
        if (this.props.leader.length < 2){
            for (var i = this.props.json1.length - 1; i >= 0; i--){
                if (this.props.json1[i]['username'].length > 11){
                    this.props.leader.push(<div id="user">
                            <span id="place">{i+1}</span>
                            <span id="usernamebig">{this.props.json1[i]['username']}</span>
                            <span id="img"><img id="pic" src={this.props.json1[i]['img']} /></span>
                            <span id="alltime">{this.props.json1[i]['alltime']}</span>
                            <span id="recent">{this.props.json1[i]['recent']}</span>
                            </div>);
                }
                else {
                    this.props.leader.push(<div id="user">
                            <span id="place">{i+1}</span>
                            <span id="username">{this.props.json1[i]['username']}</span>
                            <span id="img"><img id="pic" src={this.props.json1[i]['img']} /></span>
                            <span id="alltime">{this.props.json1[i]['alltime']}</span>
                            <span id="recent">{this.props.json1[i]['recent']}</span>
                            </div>);
                }
            }
        }
        return(
                <div>
                <div id="head">
                <span id="place">#</span>
                <span id="username">UserName</span>
                <span id="img">
                <img id="pic" src="http://www.clipartbest.com/cliparts/Rcd/6kL/Rcd6kLXc9.png" />
                </span>
                <span
                onClick={this.handleClick.bind(this)}
                id="alltimeHead">Alltime
                </span>
                <span
                onClick={this.handleRecentClick.bind(this)}
                id="recentHead">Recent</span>
                </div>
                {this.props.leader}
                </div>
              );
    }
}

class Applet extends React.Component {
    constructor(){
        super();
        this.state={toggle: 0,
            leaders: []};
    }

    changeLeaders(tog){
        this.setState((prevState) =>
                {
                if (prevState.toggle != tog){
                return {toggle: tog, leaders: []}
                }
                return {toggle: tog};
                });
    }

    render(){
        if(this.state.toggle == 0){
            return(
                    <div>
                    <Recent changeLeaders={this.changeLeaders.bind(this)} json1={this.props.json1} leader={this.state.leaders}/>
                    </div>
                  );
        }
        else if (this.state.toggle == 1){
            return(
                    <div>
                    <Recent changeLeaders={this.changeLeaders.bind(this)} json1={this.props.json2} leader={this.state.leaders}/>
                    </div>
                  );  
        }
    }    
}

