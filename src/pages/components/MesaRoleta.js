import { View } from 'react-native'
import React, { useState } from 'react'
import BotaoRoleta from './ButtonRoleta.js'
import CarteiraRoleta from './CarteiraRoleta.js'

export default function MesaRoleta() {
  const [nmr, setNmr] = useState(null)
  const colors = { red: '#921', black: '#000', green: '#161' }

  return (
    <View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* 1º Duzia , 1-18,Par*/}
          <View>
            <BotaoRoleta
              color={colors.green}
              txtBtn={'1º Duzia'}
              setValue={setNmr}
            />
            <BotaoRoleta
              color={colors.green}
              txtBtn={'1 - 18'}
              setValue={setNmr}
            />
            <BotaoRoleta
              color={colors.green}
              txtBtn={'Par'}
              setValue={setNmr}
            />
          </View>
          <View>
            {/* 0 */}
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'row'
              }}
            >
              <BotaoRoleta
                txtBtn={'0'}
                setValue={setNmr}
                color={colors.green}
              />
            </View>

            {/* 1 a 12*/}
            <View>
              <View style={{ flexDirection: 'row' }}>
                <BotaoRoleta
                  txtBtn={'1'}
                  setValue={setNmr}
                  color={colors.red}
                />
                <BotaoRoleta
                  txtBtn={'2'}
                  setValue={setNmr}
                  color={colors.black}
                />
                <BotaoRoleta
                  txtBtn={'3'}
                  setValue={setNmr}
                  color={colors.red}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <BotaoRoleta
                  txtBtn={'4'}
                  setValue={setNmr}
                  color={colors.black}
                />
                <BotaoRoleta
                  txtBtn={'5'}
                  setValue={setNmr}
                  color={colors.red}
                />
                <BotaoRoleta
                  txtBtn={'6'}
                  setValue={setNmr}
                  color={colors.black}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <BotaoRoleta
                  txtBtn={'7'}
                  setValue={setNmr}
                  color={colors.red}
                />
                <BotaoRoleta
                  txtBtn={'8'}
                  setValue={setNmr}
                  color={colors.black}
                />
                <BotaoRoleta
                  txtBtn={'9'}
                  setValue={setNmr}
                  color={colors.red}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <BotaoRoleta
                  txtBtn={'10'}
                  setValue={setNmr}
                  color={colors.black}
                />
                <BotaoRoleta
                  txtBtn={'11'}
                  setValue={setNmr}
                  color={colors.black}
                />
                <BotaoRoleta
                  txtBtn={'12'}
                  setValue={setNmr}
                  color={colors.red}
                />
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* 2º Duzia , RED, BLACK*/}
          <View>
            <BotaoRoleta
              color={colors.green}
              txtBtn={'2º Duzia'}
              setValue={setNmr}
            />
            <BotaoRoleta color={colors.red} txtBtn={'RED'} setValue={setNmr} />
            <BotaoRoleta
              color={colors.black}
              txtBtn={'BLACK'}
              setValue={setNmr}
            />
          </View>

          {/* 13 a 24*/}
          <View>
            <View style={{ flexDirection: 'row' }}>
              <BotaoRoleta
                txtBtn={'13'}
                setValue={setNmr}
                color={colors.black}
              />
              <BotaoRoleta txtBtn={'14'} setValue={setNmr} color={colors.red} />
              <BotaoRoleta
                txtBtn={'15'}
                setValue={setNmr}
                color={colors.black}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <BotaoRoleta txtBtn={'16'} setValue={setNmr} color={colors.red} />
              <BotaoRoleta
                txtBtn={'17'}
                setValue={setNmr}
                color={colors.black}
              />
              <BotaoRoleta txtBtn={'18'} setValue={setNmr} color={colors.red} />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <BotaoRoleta txtBtn={'19'} setValue={setNmr} color={colors.red} />
              <BotaoRoleta
                txtBtn={'20'}
                setValue={setNmr}
                color={colors.black}
              />
              <BotaoRoleta txtBtn={'21'} setValue={setNmr} color={colors.red} />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <BotaoRoleta
                txtBtn={'22'}
                setValue={setNmr}
                color={colors.black}
              />
              <BotaoRoleta txtBtn={'23'} setValue={setNmr} color={colors.red} />
              <BotaoRoleta
                txtBtn={'24'}
                setValue={setNmr}
                color={colors.black}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* 3º Duzia , Impar, 19-36*/}
          <View>
            <BotaoRoleta
              color={colors.green}
              txtBtn={'3º Duzia'}
              setValue={setNmr}
            />
            <BotaoRoleta
              color={colors.green}
              txtBtn={'Impar'}
              setValue={setNmr}
            />
            <BotaoRoleta
              color={colors.green}
              txtBtn={'19 - 36'}
              setValue={setNmr}
            />
          </View>

          {/* 25 a 36*/}
          <View>
            <View style={{ flexDirection: 'row' }}>
              <BotaoRoleta txtBtn={'25'} setValue={setNmr} color={colors.red} />
              <BotaoRoleta
                txtBtn={'26'}
                setValue={setNmr}
                color={colors.black}
              />
              <BotaoRoleta txtBtn={'27'} setValue={setNmr} color={colors.red} />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <BotaoRoleta
                txtBtn={'28'}
                setValue={setNmr}
                color={colors.black}
              />
              <BotaoRoleta
                txtBtn={'29'}
                setValue={setNmr}
                color={colors.black}
              />
              <BotaoRoleta txtBtn={'30'} setValue={setNmr} color={colors.red} />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <BotaoRoleta
                txtBtn={'31'}
                setValue={setNmr}
                color={colors.black}
              />
              <BotaoRoleta txtBtn={'32'} setValue={setNmr} color={colors.red} />
              <BotaoRoleta
                txtBtn={'33'}
                setValue={setNmr}
                color={colors.black}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <BotaoRoleta txtBtn={'34'} setValue={setNmr} color={colors.red} />
              <BotaoRoleta
                txtBtn={'35'}
                setValue={setNmr}
                color={colors.black}
              />
              <BotaoRoleta txtBtn={'36'} setValue={setNmr} color={colors.red} />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
