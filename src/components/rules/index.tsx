import {Button, Checkbox} from "antd";
import styled from "styled-components";


const Rules = () => {
    return (
        <RulesWrapper>
            <RulesItem>
                <div>
                    <RulesNum>
                        1
                    </RulesNum>
                </div>
                <div>
                    Each price prediction requires 100 ARES test coins. If you want to get more rewards,then you should support X2 and X5 gameplay, and you need to spend 200 and 500 ARES test coins.
                </div>
            </RulesItem>
            <RulesItem>
                <div>
                    <RulesNum>
                        2
                    </RulesNum>
                </div>
                <div>
                    If there are multiple winners in each price prediction, the rewards will be shared together. If there are players with X2 and X5 gameplay, they will be rewarded proportionally. (For example: 500 ARES on BSC is obtained by 3 ordinary predictors, 1 X2 player, 1 X5 player. Then an ordinary predictors will get 1/3+2+5 rewards, and X2 players will get 2/3+2 +5 rewards, X5 players will get 2/3+2+5 rewards). It is worth mentioning that if there is only one person who wins and is a X2 or X5 game player, the reward is the same as that of the ordinary predictor, with all bonuses for that specific prediction.
                </div>
            </RulesItem>
            <Checkbox>
                <span>
                    I have read the rules and agree to participate.
                </span>
            </Checkbox>
            <div>
                <Button>Submit</Button>
                <Button>Cancel</Button>
            </div>
        </RulesWrapper>
    );
}

const RulesWrapper = styled.div`
    width: 80%;
    margin: 0 auto;
    background-color: #FFF;
    padding: 2rem 3rem;
`;

const RulesNum = styled.div`
    width: 2.6rem;
    line-height: 2.6rem;
    background: #E7EBFF;
    border-radius: 1.3rem;
    text-align: center;
`;


const RulesItem = styled.div`
    display: flex;
    column-gap: 1rem;
    color: #2E4765;
    margin-bottom: 1rem;
`;

export default Rules;